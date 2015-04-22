// diverge:if env=cjs
module.exports =
// diverge:elif env!=globals
MyModule =
// diverge:else
window.MyModule =
// diverge:fi

function(){
  return 'diverge';
};
