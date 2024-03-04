// Run bash script

require("child_process").spawn("bash", ["./preinstall.sh"], { stdio: "inherit" });
