const addGoalBtn = document.getElementById("addGoalBtn");
const goalInput = document.getElementById("goalInput");
const goalContainer = document.getElementById("goalContainer");

let goals = [];

addGoalBtn.addEventListener("click", addGoal);

function addGoal() {

    const title = goalInput.value.trim();

    if(title === "") return;

    const goal = {
    id: Date.now(),
    title: title,
    milestones: [],
    metrics: [],
    tasks: []
};

    goals.push(goal);

    renderGoals();

    goalInput.value = "";
}

function renderGoals() {

    goalContainer.innerHTML = "";

    goals.forEach(goal => {

        const card = document.createElement("div");

        card.className = "goal-card";

        card.innerHTML = `
            <h2>${goal.title}</h2>

            <div class="progress-section">
                <p>Overall Progress: 0%</p>
            </div>

            <div class="milestone-section">

                <h3>Milestones</h3>
                    
                <input
                    type="text"
                    class="milestone-input"
                    placeholder="Add Milestone"
                >

                <button onclick="addMilestone(${goal.id}, this)">
                    Add
                </button>

                <ul>
                ${
                goal.milestones.map(m => `
                <li>

                    <strong>${m.title}</strong>

                    <div>

                        <input
                            type="text"
                            placeholder="Add Task"
                            id="task-${m.id}"
                        >

                        <button
                            onclick="addTask(${goal.id}, ${m.id})"
                        >
                            Add Task
                        </button>

                    </div>

                    <ul>
                        ${
                            m.tasks.map(task => `
                                <li>${task.title}</li>
                            `).join("")
                        }           
                    </ul>

                </li>
                `).join("")
                }
                </ul>

            </div>

            <div class="task-section">
                <h3>Tasks</h3>
                <p>No tasks yet</p>
            </div>

            <div class="metric-section">
                <h3>Metrics</h3>
                <p>No metrics added</p>
            </div>
        `;

        goalContainer.appendChild(card);
    });
}
function addMilestone(goalId, btn){

    const input =
        btn.previousElementSibling;

    const milestone =
        input.value.trim();

    if(milestone === "") return;

    const goal =
        goals.find(g => g.id === goalId);

    goal.milestones.push({
        id: Date.now(),
        title: milestone,
        tasks: []
    });

    renderGoals();
}
function addTask(goalId, milestoneId){

    const input =
        document.getElementById(
            `task-${milestoneId}`
        );

    const taskTitle =
        input.value.trim();

    if(taskTitle === "") return;

    const goal =
        goals.find(g => g.id === goalId);

    const milestone =
        goal.milestones.find(
            m => m.id === milestoneId
        );

    milestone.tasks.push({
        id: Date.now(),
        title: taskTitle,
        completed: false
    });

    renderGoals();
}