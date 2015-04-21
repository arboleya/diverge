var fs = require('fs');
var path = require('path');


function readfile(filepath){
  return fs.readFileSync(path.resolve(filepath), 'utf-8');
}

function writefile(filepath, contents){
  fs.writeFileSync(path.resolve(filepath), contents);
  return contents;
}


module.exports = function(input, output, locals){
  var buffer = [];
  var source = readfile(input);
  var reg = /^.+condilation:if([\s\S]+?)condilation:fi.*$/gm;

  while ((res = reg.exec(source))){
    var before = res[0];
    var after = parse_conditional_block(before, locals);
    source = source.replace(before + '\n', after);
  }

  writefile(output, source);
};


function parse_conditional_block(block, locals){

  var buffer = '';
  var passed = 0;
  var capturing = false;

  var i, line, lines = block.split('\n');

  for(i in lines){

    line = lines[i];

    // if, elif
    if(/condilation:(if|elif)/.test(line)) {
      var cond = line.match(/(\w+)\s*(\!?=)\s*(\w+)/);
      var cond_parts = cond.slice(1);

      var key = cond_parts[0];
      var mode = cond_parts[1];
      var value = cond_parts[2];

      if(mode === '=')
        capturing = locals[key] == value;
      else if(mode === '!=')
        capturing = locals[key] !== value;

      if(capturing) passed++;

      continue;
    }
    
    // else
    else if(/condilation:else/.test(line)){
      capturing = passed === 0;
      continue;
    }

    // fi
    // else if(/condilation:fi/.test(line))
    //   return buffer;

    // capturing lines
    else if(capturing){
      buffer += line + '\n';
    }
  }

  return buffer;
}