import fs from 'fs';
import path from 'path';
const defaultGatefileEs6 = `
export default function() {
	return {
		'TEST_SECRET_1': {
			sources: [
				() => {throw 'Replace me!';}
			]
		}
	}
}
`;

const defaultGatefile = `
module.exports = function() {
	return {
		'TEST_SECRET_1': {
			sources: [
				function () {throw 'Replace me!';}
			]
		}
	}
};
`;

export function init(opts, flags) {
  const gatefilePath = path.join(process.cwd(), 'Gatefile.js');
  try {
    if (fs.statSync(gatefilePath).isFile()) {
      throw 'Gatefile.js already exists!';
    }
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }
  let gatefile;
  if (flags && flags.es6) {
    gatefile = defaultGatefileEs6;
  } else {
    gatefile = defaultGatefile;
  }
  fs.writeFile(gatefilePath, gatefile);
  console.log(`Wrote default Gatefile.js to ${gatefilePath}`);
}
