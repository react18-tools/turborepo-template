const { execSync } = require("child_process");

module.exports = (newMajor_minor, oldMajor_minor) => {
  /** Update SECURITY.md */
  execSync(
    `sed -i -e "s/.*| :white_check_mark:.*/| ${newMajor_minor}.x   | :white_check_mark: |/" SECURITY.md`,
  );
  execSync(
    `sed -i -e "s/.*| :warning:.*/| ${oldMajor_minor}.x   | :warning:          |/" SECURITY.md`,
  );
  execSync(`sed -i -e "s/.*| :x:.*/| < ${oldMajor_minor}   | :x:                |/" SECURITY.md`);
  execSync(
    `git add SECURITY.md && git commit -m 'Update SECURITY.md [skip ci]' && git push origin ${process.env.BRANCH}`,
  );
};
