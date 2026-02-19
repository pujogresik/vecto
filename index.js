import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const state = {
  proposals: {}
};

function banner() {
  console.clear();
  console.log("\x1b[36m");
  console.log("╔══════════════════════════════╗");
  console.log("      ◈  VECTO CORE  ◈        ");
  console.log("╚══════════════════════════════╝");
  console.log("\x1b[0m");
  console.log("A modular governance engine\n");
}

function menu() {
  console.log("Commands:");
  console.log("1. create   → create proposal");
  console.log("2. vote     → vote proposal");
  console.log("3. list     → list proposals");
  console.log("4. finalize → finalize proposal");
  console.log("5. exit     → shutdown\n");
}

function prompt() {
  rl.question("vecto> ", (cmd) => {
    handle(cmd.trim());
  });
}

function handle(cmd) {
  switch (cmd) {
    case "create":
      rl.question("Proposal ID: ", (id) => {
        state.proposals[id] = { votes: 0, status: "ACTIVE" };
        console.log("✔ Proposal created\n");
        prompt();
      });
      break;

    case "vote":
      rl.question("Proposal ID: ", (id) => {
        if (state.proposals[id]) {
          state.proposals[id].votes++;
          console.log("✔ Vote recorded\n");
        } else {
          console.log("⚠ Proposal not found\n");
        }
        prompt();
      });
      break;

    case "list":
      console.log("\n📋 Proposal List:");
      console.log(state.proposals);
      console.log("");
      prompt();
      break;

    case "finalize":
      rl.question("Proposal ID: ", (id) => {
        if (state.proposals[id]) {
          state.proposals[id].status = "FINALIZED";
          console.log("✔ Proposal finalized\n");
        } else {
          console.log("⚠ Proposal not found\n");
        }
        prompt();
      });
      break;

    case "exit":
      console.log("Shutting down VECTO...");
      rl.close();
      break;

    default:
      console.log("Unknown command\n");
      prompt();
  }
}

banner();
menu();
prompt();
