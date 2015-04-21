// condilation:if env=cjs
module.exports = 
// condilation:elif env!=globals
MyModule = 
// condilation:else
window.MyModule =
// condilation:fi

function(){
  return 'condilation';
};