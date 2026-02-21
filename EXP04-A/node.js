const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let employee = [];
function showmenu() {
    console.log(`
        1. Add Employee
        2. View Employee
        3. search Employee
        4. Delete Employee
        5. Exit

    `);
    rl.question("Choose an option :", handleMenu);
}
function handleMenu(choice) {
    switch (choice) {
        case "1":
            rl.question("Enter id: ", id => {
                rl.question("Enter Name: ", name => {
                    employee.push({ id, name });
                    console.log("Employee added!");
                    showmenu();
                });
            });
            break;

        case "2":
            console.log("\n--- Employee List ---");
            if (employee.length === 0) {
                console.log("No employees found!");
            } else {
                employee.forEach((emp, index) => {
                    console.log(`${index + 1}. ID: ${emp.id}, Name: ${emp.name}`);
                });
            }
            showmenu();
            break;

        case "3":
            rl.question("Enter ID to search: ", searchId => {
                const found = employee.find(emp => emp.id === searchId);
                if (found) {
                    console.log(`Employee Found - ID: ${found.id}, Name: ${found.name}`);
                } else {
                    console.log("Employee not found!");
                }
                showmenu();
            });
            break;

        case "4":
            rl.question("Enter ID to delete: ", deleteId => {
                const index = employee.findIndex(emp => emp.id === deleteId);
                if (index !== -1) {
                    const deleted = employee.splice(index, 1);
                    console.log(`Employee ${deleted[0].name} deleted successfully!`);
                } else {
                    console.log("Employee not found!");
                }
                showmenu();
            });
            break;

        case "5":
            console.log("Thank you for using Employee Management System!");
            rl.close();
            break;

        default:
            console.log("Invalid choice! Please select a valid option (1-5).");
            showmenu();
            break;
    }
}

showmenu();