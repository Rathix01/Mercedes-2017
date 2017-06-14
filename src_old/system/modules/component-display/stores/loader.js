//const getPath = () => window.location.pathname.replace('/', '');
const toPaths =() => (key) => key.split('/').filter(keyPart => keyPart === getPath() || getPath() === '').length

const requireAll = (r) => {
  const files = r.keys().filter(toPaths);
  files.forEach((file) => {
  	//console.log(`Loading: ${file}`)
    r(file);
  });
};

requireAll(require.context('../../', true, /\.demo\.js$/));

//console.log('loading demo components...')