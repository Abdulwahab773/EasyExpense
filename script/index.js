import { doc, setDoc, onAuthStateChanged, auth, Timestamp, db, collection, addDoc, onSnapshot, query, where, signOut, orderBy } from "./firebase.js"

const themeToggle = document.getElementById('theme-toggle');
themeToggle.onclick = () => document.documentElement.classList.toggle('dark');

const addBtn = document.getElementById('add-transaction-btn');
const modal = document.getElementById('add-transaction-modal');
const closeModalBtn = document.getElementById("closeModalBtn");


addBtn.addEventListener('click', () => {
    modal.classList.remove("hidden")
});


closeModalBtn.addEventListener('click', () => {
    modal.classList.add("hidden")
})


modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden")
    }
});


const profileButton = document.getElementById('profileButton');
const profileMenu = document.getElementById('profileMenu');

profileButton.addEventListener('click', () => {
    profileMenu.classList.toggle('hidden');
    profileMenu.classList.toggle('scale-95');
    profileMenu.classList.toggle('scale-100');
});

window.addEventListener('click', (e) => {
    if (!profileButton.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.add('hidden');
    }
});


window.onload = "./index.html"

let totalBalance = document.getElementById("totalBalance");
let income = document.getElementById("income");
let expense = document.getElementById("expense");
let savings = document.getElementById("savings");
let logoutBtn = document.getElementById("logoutBtn");



let doneTransBtn = document.getElementById("doneTransBtn");
let transactionType = document.getElementById("transactionType");
let transactionTitle = document.getElementById("transactionTitle");
let transactionAmount = document.getElementById("transactionAmount");
let transactionDate = document.getElementById("transactionDate");
let transactionsHistory = document.getElementById("transactionsHistory");



let userName = document.getElementById("userName");
let userImage = document.getElementById("userImage");
let currentUID = null;


onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUID = user.uid;
        userName.innerHTML = user.displayName;

        if (user.photoURL === null) {
            userImage.src = "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg";
        } else {
            userImage.src = user.photoURL
        }

        getTransactions(currentUID);
    } else {
        location = "./index.html"
    }
});


const addTransaction = async () => {
    await addDoc(collection(db, "transactions"), {
        uid: currentUID,
        type: transactionType.value,
        title: transactionTitle.value,
        amount: Number(transactionAmount.value),
        timestamp: Timestamp.now()
    });
    transactionTitle.value = "";
    transactionAmount.value = "";
    modal.classList.add("hidden");
}


const getTransactions = async (currentUID) => {

    let collectionRef = collection(db, "transactions");
    let dbRef = query(collectionRef, where("uid", "==", currentUID), orderBy("timestamp", "desc"));
    await onSnapshot(dbRef, (snapshot) => {
        transactionsHistory.innerHTML = "";

        let totalIncome = 0;
        let totalExpense = 0;
        let expenseGroup = {}; 


        snapshot.forEach((docs) => {
            let data = docs.data();

            let createdAt = data.timestamp;
            let date = createdAt.toDate();

            if (data.type === "income") {

                totalIncome += data.amount;

                transactionsHistory.innerHTML += `
                <li class="py-3 flex justify-between items-center">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-medium">${data.title}</span>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">${date.toLocaleString()}</p>
                </div>
                <span class="font-semibold text-green-500">+${data.amount}</span>
                </li>
                `
            } else {

                totalExpense += data.amount;

                if (expenseGroup[data.title]) {
                    expenseGroup[data.title] += data.amount;
                } else {
                    expenseGroup[data.title] = data.amount;
                }

                transactionsHistory.innerHTML += `
                <li class="py-3 flex justify-between items-center">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-medium">${data.title}</span>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">${date.toLocaleString()}</p>
                </div>
                <span class="font-semibold text-red-500">-${data.amount}</span>
                </li>
                `
            }

            income.innerHTML = `$${totalIncome}`;
            expense.innerHTML = `$${totalExpense}`;
            savings.innerHTML = `$${totalIncome - totalExpense}`;
            totalBalance.innerHTML = `$${totalIncome - totalExpense}`;

        })

        const labels = Object.keys(expenseGroup);
        const values = Object.values(expenseGroup);
        createOrUpdatePieChart(labels, values); 
    })
}




let logOut = () => {
    signOut(auth).then(() => {
        location = "./index.html";

    }).catch((error) => {
        console.log(error);
    });
}


logoutBtn.addEventListener('click', logOut);


doneTransBtn.addEventListener('click', () => {
    addTransaction();
});



const ctx = document.getElementById('expenseChart').getContext('2d');
let pieChart; 

const createOrUpdatePieChart = (labels, data) => {
    if (pieChart) {
        pieChart.data.labels = labels;
        pieChart.data.datasets[0].data = data;
        pieChart.update();
    } else {
        pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Expense Distribution',
                    data: data,
                    backgroundColor: [
                        '#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6', '#FB923C', '#4ADE80'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                return `${label}: $${value}`;
                            }
                        }
                    }
                }
            }
        });
    }
};
