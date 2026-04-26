export const categories = [
  { id: 'dsa', name: 'Data Structures & Algorithms', icon: '🧠' },
  { id: 'os', name: 'Operating Systems', icon: '💻' },
  { id: 'dbms', name: 'Database Management', icon: '🗄️' },
  { id: 'cn', name: 'Computer Networks', icon: '🌐' },
  { id: 'aptitude', name: 'Quantitative Aptitude', icon: '📐' },
  { id: 'oop', name: 'Object-Oriented Programming', icon: '🧩' },
  { id: 'sd', name: 'System Design Basics', icon: '🏗️' }
];

const rawTestsData = {
  dsa: [
    { id: 'dsa_test_1', name: 'Arrays & Strings Core', difficulty: 'Easy', timeLimit: 10, questions: [
      { q: "What is the time complexity of accessing an array element?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correct: 0, topic: "Arrays" },
      { q: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Tree", "Graph"], correct: 1, topic: "Stacks" },
      { q: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(1)"], correct: 2, topic: "Sorting" },
      { q: "Which traversal of BST gives sorted order?", options: ["Preorder", "Postorder", "Inorder", "Level-order"], correct: 2, topic: "Trees" },
      { q: "Binary search works on?", options: ["Unsorted arrays", "Sorted arrays", "Maps", "Linked Lists"], correct: 1, topic: "Searching" },
    ]},
    { id: 'dsa_test_2', name: 'Linked Lists Mastery', difficulty: 'Medium', timeLimit: 12, questions: [
      { q: "What is the advantage of using a linked list over an array?", options: ["Random access", "Memory efficiency", "Dynamic size", "Cache locality"], correct: 2, topic: "Linked Lists" },
      { q: "Floyd's cycle-finding algorithm relies on...", options: ["Recursion", "Two pointers", "Hashing", "Dynamic Programming"], correct: 1, topic: "Pointers" },
      { q: "To insert a node at the beginning of a singly linked list takes:", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correct: 0, topic: "Insertion" },
      { q: "Which linked list allows traversing in both directions?", options: ["Singly", "Doubly", "Circular", "Linear"], correct: 1, topic: "Types" },
      { q: "A stack can be implemented using:", options: ["Arrays", "Linked Lists", "Both", "None"], correct: 2, topic: "Stacks" },
    ]},
    { id: 'dsa_test_3', name: 'Trees & Graphs', difficulty: 'Hard', timeLimit: 15, questions: [
      { q: "DFS uses which data structure?", options: ["Queue", "Stack", "Array", "Linked List"], correct: 1, topic: "Graphs" },
      { q: "BFS uses which data structure?", options: ["Queue", "Stack", "Array", "Linked List"], correct: 0, topic: "Graphs" },
      { q: "What is the max number of nodes at level 'i' in a binary tree?", options: ["2^i", "i^2", "2^(i-1)", "2*i"], correct: 0, topic: "Trees" },
      { q: "Dijkstra's algorithm is used for...", options: ["Sorting", "MST", "Shortest Path", "Cycle detection"], correct: 2, topic: "Shortest Path" },
      { q: "A graph with no cycles is called:", options: ["Cyclic", "Acyclic", "Dense", "Complete"], correct: 1, topic: "Terminology" },
    ]},
    { id: 'dsa_test_4', name: 'Dynamic Programming', difficulty: 'Hard', timeLimit: 20, questions: [
      { q: "Dynamic Programming is mainly an optimization over...", options: ["Greedy", "Plain Recursion", "Backtracking", "Divide and Conquer"], correct: 1, topic: "DP Basics" },
      { q: "Which approach solves subproblems top-down?", options: ["Tabulation", "Memoization", "Iteration", "Recursion alone"], correct: 1, topic: "Memoization" },
      { q: "The 0/1 Knapsack problem is an example of:", options: ["Greedy", "DP", "Divide & Conquer", "Backtracking"], correct: 1, topic: "DP Problems" },
      { q: "Fibonacci series optimized using DP takes how much time?", options: ["O(2^n)", "O(n^2)", "O(n)", "O(log n)"], correct: 2, topic: "Complexity" },
      { q: "Coin change minimum coins requires:", options: ["Greedy", "DP", "BFS", "DFS"], correct: 1, topic: "DP Problems" },
    ]},
    { id: 'dsa_test_5', name: 'Advanced Algorithms', difficulty: 'Hard', timeLimit: 20, questions: [
      { q: "KMP algorithm is used for:", options: ["Sorting", "Graph coloring", "Pattern matching", "Shortest path"], correct: 2, topic: "Strings" },
      { q: "Trie data structure is mainly used for:", options: ["Sorting numbers", "Prefix search", "Graph traversal", "Matrix multiplication"], correct: 1, topic: "Tries" },
      { q: "What is the time complexity of Kruskal's algorithm?", options: ["O(E log V)", "O(V^2)", "O(E + V)", "O(1)"], correct: 0, topic: "Graphs" },
      { q: "Which algorithm finds strongly connected components?", options: ["Dijkstra", "Bellman-Ford", "Kosaraju", "Prim"], correct: 2, topic: "Graphs" },
      { q: "A bloom filter guarantees:", options: ["No false positives", "No false negatives", "O(1) deletions", "Perfect hashing"], correct: 1, topic: "Advanced DS" },
    ]}
  ],
  os: [
    { id: 'os_test_1', name: 'OS Fundamentals', difficulty: 'Easy', timeLimit: 8, questions: [
      { q: "What is the core of the OS?", options: ["Shell", "Hardware", "Kernel", "Compiler"], correct: 2, topic: "Basics" },
      { q: "Multiprogramming means:", options: ["Multiple CPUs", "Keeping CPU busy by executing multiple jobs", "Network programming", "Database management"], correct: 1, topic: "Concepts" },
      { q: "Which scheduler selects highly priority jobs from pool?", options: ["Short-term", "Long-term", "Medium-term", "None"], correct: 1, topic: "Scheduling" },
      { q: "Context switch is overhead. True or False?", options: ["True", "False", "Only in Linux", "Depends"], correct: 0, topic: "Context Switch" },
      { q: "The mechanism that brings a page into memory only when needed:", options: ["Demand paging", "Segmentation", "Swapping", "Thrashing"], correct: 0, topic: "Memory" },
    ]},
    { id: 'os_test_2', name: 'Process Synchronization', difficulty: 'Medium', timeLimit: 10, questions: [
      { q: "A mutex is generally implemented using:", options: ["Hardware instructions", "Semaphores", "Monitors", "Spinlocks"], correct: 0, topic: "Mutex" },
      { q: "Which condition is required for deadlock?", options: ["Mutual exclusion", "Hold and wait", "No preemption", "All of the above"], correct: 3, topic: "Deadlocks" },
      { q: "Banker's algorithm is used for:", options: ["Deadlock prevention", "Deadlock avoidance", "Deadlock recovery", "Resource allocation"], correct: 1, topic: "Deadlocks" },
      { q: "A race condition occurs when:", options: ["Two processes run in parallel", "Unsynchronized threads access shared data", "CPU goes idle", "Disk fails"], correct: 1, topic: "Concurrency" },
      { q: "A binary semaphore can take values:", options: ["0 and 1", "0 to N", "-1 and 1", "Any integer"], correct: 0, topic: "Semaphores" },
    ]},
    { id: 'os_test_3', name: 'Memory Management', difficulty: 'Medium', timeLimit: 12, questions: [
      { q: "Logical memory divided into equal-sized blocks is:", options: ["Pages", "Frames", "Segments", "Sectors"], correct: 0, topic: "Paging" },
      { q: "TLB stands for:", options: ["Translation Lookaside Buffer", "Total Limit Bound", "Time Limit Buffer", "Translation Logic Block"], correct: 0, topic: "Hardware" },
      { q: "High paging activity is known as:", options: ["Swapping", "Booting", "Thrashing", "Caching"], correct: 2, topic: "Virtual Memory" },
      { q: "Which page replacement algorithm suffers from Belady's Anomaly?", options: ["LRU", "Optimal", "FIFO", "MRU"], correct: 2, topic: "Page Replacement" },
      { q: "External fragmentation is solved by:", options: ["Compaction", "Paging", "Both", "None"], correct: 2, topic: "Fragmentation" },
    ]},
    { id: 'os_test_4', name: 'File Systems & Storage', difficulty: 'Easy', timeLimit: 8, questions: [
      { q: "In FAT, what does it stand for?", options: ["File Allocation Table", "Folder Access Type", "File Access Time", "Fast Allocation Table"], correct: 0, topic: "File Systems" },
      { q: "A directory inside another is a:", options: ["Root", "Subdirectory", "Main directory", "Volume"], correct: 1, topic: "Directories" },
      { q: "RAID 0 relies on:", options: ["Mirroring", "Striping", "Parity", "Hashing"], correct: 1, topic: "RAID" },
      { q: "Which disk scheduling algorithm avoids starvation best?", options: ["SSTF", "FCFS", "SCAN", "C-SCAN"], correct: 3, topic: "Disk Scheduling" },
      { q: "An inode in Linux stores:", options: ["File content", "File metadata", "Boot sector", "Swap space"], correct: 1, topic: "Inodes" },
    ]},
    { id: 'os_test_5', name: 'Threads & CPU Scheduling', difficulty: 'Hard', timeLimit: 15, questions: [
      { q: "A thread shares ____ with other threads of the same process.", options: ["Program Counter", "Stack", "Registers", "Code section"], correct: 3, topic: "Threads" },
      { q: "Round Robin scheduling inherently uses:", options: ["Preemption", "Priority", "Shortest job first", "No preemption"], correct: 0, topic: "Scheduling" },
      { q: "Convoy effect is associated with:", options: ["FCFS", "SJF", "Round Robin", "Multilevel Queue"], correct: 0, topic: "Scheduling" },
      { q: "User level threads are managed by:", options: ["Kernel", "Thread library", "Hardware", "Compiler"], correct: 1, topic: "Threads" },
      { q: "Which is a real-time OS scheduling algorithm?", options: ["Rate Monotonic", "FCFS", "LRU", "CSCAN"], correct: 0, topic: "Real-time" },
    ]}
  ],
  dbms: [
    { id: 'dbms_test_1', name: 'Intro to Databases', difficulty: 'Easy', timeLimit: 8, questions: [
      { q: "Data abstraction consists of how many levels?", options: ["2", "3", "4", "5"], correct: 1, topic: "Architecture" },
      { q: "Which command is a DDL?", options: ["SELECT", "INSERT", "CREATE", "UPDATE"], correct: 2, topic: "SQL Commands" },
      { q: "ACID properties: What does 'A' stand for?", options: ["Accuracy", "Atomicity", "Availability", "Active"], correct: 1, topic: "Transactions" },
      { q: "Primary key must be:", options: ["Unique", "Not Null", "Both", "Neither"], correct: 2, topic: "Keys" },
      { q: "RDBMS stands for:", options: ["Relational Database Management System", "Rapid Data Manipulation", "Record Data", "None"], correct: 0, topic: "Basics" },
    ]},
    { id: 'dbms_test_2', name: 'SQL Queries', difficulty: 'Medium', timeLimit: 12, questions: [
      { q: "To eliminate duplicate rows, use:", options: ["UNIQUE", "DISTINCT", "NO DUPLICATE", "DIFFERENT"], correct: 1, topic: "SQL" },
      { q: "Which JOIN returns all rows from right table?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"], correct: 2, topic: "Joins" },
      { q: "GROUP BY is generally followed by which clause to filter aggregates?", options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"], correct: 1, topic: "Aggregation" },
      { q: "To pattern match characters, SQL uses:", options: ["=", "LIKE", "MATCH", "REGEX"], correct: 1, topic: "SQL" },
      { q: "Which is NOT an aggregate function?", options: ["SUM()", "COUNT()", "AVG()", "LOWER()"], correct: 3, topic: "Functions" },
    ]},
    { id: 'dbms_test_3', name: 'Normalization', difficulty: 'Hard', timeLimit: 15, questions: [
      { q: "1NF requires:", options: ["No repeating groups", "Partial dependency removed", "Transitive dependency removed", "BCNF"], correct: 0, topic: "Normal Forms" },
      { q: "BCNF is stricter than:", options: ["1NF", "2NF", "3NF", "All of the above"], correct: 3, topic: "Normal Forms" },
      { q: "Removing transitive dependencies leads to:", options: ["1NF", "2NF", "3NF", "4NF"], correct: 2, topic: "Normal Forms" },
      { q: "A functional dependency X->Y implies:", options: ["Y uniquely determines X", "X uniquely determines Y", "X and Y are primary keys", "None"], correct: 1, topic: "Dependencies" },
      { q: "Denormalization is done to:", options: ["Reduce space", "Improve read performance", "Enforce constraints", "Create foreign keys"], correct: 1, topic: "Optimization" },
    ]},
    { id: 'dbms_test_4', name: 'Indexing & Transactions', difficulty: 'Medium', timeLimit: 10, questions: [
      { q: "Which index type dictates the physical sort order?", options: ["Non-clustered", "Clustered", "Hash", "Bitmap"], correct: 1, topic: "Indexing" },
      { q: "B-Tree is commonly used for:", options: ["Text search", "Database indexing", "Hashing", "Sorting"], correct: 1, topic: "Structures" },
      { q: "The state of a transaction after COMMIT is:", options: ["Active", "Partially committed", "Committed", "Aborted"], correct: 2, topic: "Transactions" },
      { q: "Dirty read happens when:", options: ["Reading uncommitted data", "Reading deleted data", "Reading twice gets different data", "None"], correct: 0, topic: "Concurrency" },
      { q: "Write-Ahead Logging (WAL) ensures:", options: ["Atomicity & Durability", "Consistency", "Isolation", "Redundancy"], correct: 0, topic: "Logging" },
    ]},
    { id: 'dbms_test_5', name: 'Advanced Concepts', difficulty: 'Hard', timeLimit: 15, questions: [
      { q: "CAP theorem states you can only have 2 of 3: Consistency, Availability, and...", options: ["Partition tolerance", "Performance", "Persistence", "Paging"], correct: 0, topic: "CAP" },
      { q: "NoSQL databases typically lack:", options: ["Scalability", "Flexible schema", "Strict ACID guarantees", "JSON support"], correct: 2, topic: "NoSQL" },
      { q: "A View in SQL is:", options: ["A physical table", "A virtual table based on query", "An index", "A trigger procedure"], correct: 1, topic: "Objects" },
      { q: "A Trigger is executed:", options: ["Manually", "By chron job", "Automatically on events", "Only by admin"], correct: 2, topic: "Triggers" },
      { q: "Two-Phase Locking guarantees:", options: ["No deadlocks", "Serializability", "Atomicity", "Availability"], correct: 1, topic: "Locking" },
    ]}
  ],
  cn: [
    { id: 'cn_test_1', name: 'OSI & TCP/IP Model', difficulty: 'Easy', timeLimit: 8, questions: [
      { q: "How many layers in OSI model?", options: ["4", "5", "6", "7"], correct: 3, topic: "OSI" },
      { q: "Which layer handles routing?", options: ["Data Link", "Network", "Transport", "Application"], correct: 1, topic: "Layers" },
      { q: "TCP operates at which layer?", options: ["Network", "Transport", "Session", "Physical"], correct: 1, topic: "Layers" },
      { q: "HTTP operates at which OSI layer?", options: ["Application", "Presentation", "Session", "Transport"], correct: 0, topic: "Layers" },
      { q: "Mac addresses exist at:", options: ["Physical", "Data Link", "Network", "Transport"], correct: 1, topic: "Addressing" },
    ]},
    { id: 'cn_test_2', name: 'IP Addresses', difficulty: 'Medium', timeLimit: 10, questions: [
      { q: "IPv4 length is:", options: ["16 bits", "32 bits", "64 bits", "128 bits"], correct: 1, topic: "IPv4" },
      { q: "IPv6 length is:", options: ["32 bits", "64 bits", "128 bits", "256 bits"], correct: 2, topic: "IPv6" },
      { q: "Which IP is loopback?", options: ["192.168.1.1", "127.0.0.1", "0.0.0.0", "255.255.255.255"], correct: 1, topic: "IP" },
      { q: "What does subnet mask do?", options: ["Encrypts IP", "Identifies network vs host portion", "Blocks malware", "Translates MAC"], correct: 1, topic: "Subnetting" },
      { q: "NAT stands for:", options: ["Network Access Table", "Network Address Translation", "Node Address Tool", "Network Area Topology"], correct: 1, topic: "Routing" },
    ]},
    { id: 'cn_test_3', name: 'Protocols', difficulty: 'Medium', timeLimit: 10, questions: [
      { q: "FTP port is:", options: ["21", "22", "80", "443"], correct: 0, topic: "Ports" },
      { q: "Which is connectionless?", options: ["TCP", "UDP", "FTP", "SSH"], correct: 1, topic: "Transport" },
      { q: "DNS operates on port:", options: ["53", "25", "23", "110"], correct: 0, topic: "Ports" },
      { q: "Which protocol gets IP dynamically?", options: ["ARP", "DHCP", "ICMP", "DNS"], correct: 1, topic: "Protocols" },
      { q: "HTTPS uses which port by default?", options: ["80", "8080", "443", "8443"], correct: 2, topic: "Ports" },
    ]},
    { id: 'cn_test_4', name: 'Network Security', difficulty: 'Hard', timeLimit: 12, questions: [
      { q: "Firewall mainly operates at:", options: ["Network Layer", "Physical layer", "Data Link", "All layers"], correct: 0, topic: "Security" },
      { q: "IPsec operates in which layer?", options: ["Application", "Transport", "Network", "Data Link"], correct: 2, topic: "VPN" },
      { q: "A DDoS attack aims to:", options: ["Steal data", "Overwhelm resources", "Corrupt database", "Sniff packets"], correct: 1, topic: "Attacks" },
      { q: "Symmetric encryption uses:", options: ["Two keys", "A single key", "No key", "Hashing"], correct: 1, topic: "Encryption" },
      { q: "What handles asymmetric encryption on the web?", options: ["TLS/SSL", "FTP", "SNMP", "ARP"], correct: 0, topic: "Encryption" },
    ]},
    { id: 'cn_test_5', name: 'Routing & Switching', difficulty: 'Hard', timeLimit: 15, questions: [
      { q: "A Switch operates at layer:", options: ["1", "2", "3", "7"], correct: 1, topic: "Devices" },
      { q: "OSPF is a:", options: ["Distance Vector protocol", "Link State protocol", "Path Vector", "Application"], correct: 1, topic: "Routing" },
      { q: "BGP is used for:", options: ["Intranet routing", "Internet core routing", "Switching", "DNS resolution"], correct: 1, topic: "Routing" },
      { q: "TTL field prevents:", options: ["Packet duplication", "Infinite loops", "Data corruption", "Unauthorized access"], correct: 1, topic: "IP packet" },
      { q: "ARP maps:", options: ["MAC to IP", "IP to MAC", "Name to IP", "Port to App"], correct: 1, topic: "ARP" },
    ]}
  ],
  aptitude: [
    { id: 'apt_test_1', name: 'Quantitative Basics', difficulty: 'Medium', timeLimit: 12, questions: [
      { q: "If cost price is 100, selling price is 120. Profit %?", options: ["10%", "20%", "25%", "30%"], correct: 1, topic: "Profit Loss" },
      { q: "A train running at 72km/hr crosses a 200m pole in?", options: ["10s", "15s", "12s", "20s"], correct: 0, topic: "Speed Time Docs" }, // 72 km/hr = 20m/s. 200/20 = 10
      { q: "LCM of 12 and 18 is:", options: ["24", "36", "48", "72"], correct: 1, topic: "Number System" },
      { q: "Probability of getting head on coin flip:", options: ["1/2", "1", "1/4", "1/3"], correct: 0, topic: "Probability" },
      { q: "20% of 1500 is:", options: ["300", "200", "400", "150"], correct: 0, topic: "Percentages" },
    ]},
    { id: 'apt_test_2', name: 'Logical Reasoning', difficulty: 'Medium', timeLimit: 12, questions: [
      { q: "Look at this series: 2, 4, 8, 16... What number should come next?", options: ["20", "24", "32", "64"], correct: 2, topic: "Series" },
      { q: "Odometer is to mileage as compass is to:", options: ["Speed", "Hiking", "Needle", "Direction"], correct: 3, topic: "Analogies" },
      { q: "Window is to pane as book is to:", options: ["Novel", "Glass", "Cover", "Page"], correct: 3, topic: "Analogies" },
      { q: "CUP : LIP :: BIRD : ?", options: ["BUSH", "GRASS", "FOREST", "BEAK"], correct: 3, topic: "Analogies" },
      { q: "Find odd one out: Apple, Orange, Banana, Potato", options: ["Apple", "Orange", "Banana", "Potato"], correct: 3, topic: "Classification" },
    ]},
    { id: 'apt_test_3', name: 'Number Series', difficulty: 'Hard', timeLimit: 10, questions: [
      { q: "1, 4, 9, 16, 25, ?", options: ["30", "36", "49", "64"], correct: 1, topic: "Series" },
      { q: "3, 6, 11, 18, ?", options: ["27", "25", "30", "29"], correct: 0, topic: "Series" }, // differences: 3, 5, 7, 9 -> 18+9 = 27
      { q: "10, 22, 46, 94, ?", options: ["180", "184", "190", "192"], correct: 2, topic: "Series" }, // 10*2+2=22, 22*2+2=46... 94*2+2=190
      { q: "Fibonacci: 5, 8, 13, ?", options: ["20", "21", "22", "24"], correct: 1, topic: "Series" },
      { q: "2, 3, 5, 7, 11, ?, 17", options: ["12", "13", "14", "15"], correct: 1, topic: "Primes" },
    ]},
    { id: 'apt_test_4', name: 'Time & Work', difficulty: 'Hard', timeLimit: 15, questions: [
      { q: "A does work in 10 days, B in 15 days. Together they take?", options: ["5", "6", "8", "9"], correct: 1, topic: "Work" },
      { q: "2 pipes fill tank in 2 & 3 hrs. Together they take?", options: ["1 hr 12 mins", "1.5 hrs", "5 hrs", "1.2 hrs"], correct: 0, topic: "Pipes" },
      { q: "12 men complete work in 8 days. 16 men will take?", options: ["4 days", "6 days", "5 days", "7 days"], correct: 1, topic: "Work" },
      { q: "A is twice as fast as B. Together they finish in 14 days. A alone takes?", options: ["21 days", "28 days", "42 days", "30 days"], correct: 0, topic: "Efficiency" },
      { q: "Work done ratio is A:B = 2:3. Time ratio is?", options: ["2:3", "3:2", "4:9", "1:1"], correct: 1, topic: "Efficiency" },
    ]},
    { id: 'apt_test_5', name: 'Advanced Math', difficulty: 'Hard', timeLimit: 20, questions: [
      { q: "Sum of first 100 natural numbers?", options: ["5000", "5050", "4950", "5100"], correct: 1, topic: "Summation" },
      { q: "Roots of x^2 - 5x + 6 = 0?", options: ["2,3", "-2,-3", "1,6", "0,5"], correct: 0, topic: "Algebra" },
      { q: "log(1000) base 10 = ?", options: ["1", "2", "3", "10"], correct: 2, topic: "Logarithms" },
      { q: "Value of sin(90) + cos(0)?", options: ["0", "1", "2", "-1"], correct: 2, topic: "Trig" },
      { q: "Difference between CI and SI for 2 years on Rs 1000 at 10%?", options: ["10", "20", "50", "100"], correct: 0, topic: "Interest" }, // Pr^2/10000 = 1000 * 100 / 10000 = 10
    ]}
  ],
  oop: [
    { id: 'oop_test_1', name: 'OOP Fundamentals', difficulty: 'Easy', timeLimit: 10, questions: [
      { q: "Which OOP concept binds data and methods together?", options: ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"], correct: 1, topic: "Core Concepts" },
      { q: "What is method overloading?", options: ["Same method name with different parameter list", "Overriding superclass method", "Calling private method", "Using static methods only"], correct: 0, topic: "Polymorphism" },
      { q: "Which keyword refers to current object in many OOP languages?", options: ["self", "super", "this", "current"], correct: 2, topic: "Objects" },
      { q: "Abstraction focuses on:", options: ["Hiding implementation details", "Storing data in arrays", "Faster compilation", "Memory allocation"], correct: 0, topic: "Abstraction" },
      { q: "A class is:", options: ["An instance", "A blueprint for objects", "Only data", "A compiler directive"], correct: 1, topic: "Classes" },
    ]},
    { id: 'oop_test_2', name: 'Inheritance & Polymorphism', difficulty: 'Medium', timeLimit: 12, questions: [
      { q: "Runtime polymorphism is commonly achieved through:", options: ["Function overloading", "Virtual functions/method overriding", "Templates", "Macros"], correct: 1, topic: "Polymorphism" },
      { q: "If class B extends A, B is called:", options: ["Parent class", "Derived/Subclass", "Abstract class", "Interface"], correct: 1, topic: "Inheritance" },
      { q: "Which principle allows reuse of existing code from base classes?", options: ["Composition", "Inheritance", "Encapsulation", "Aggregation"], correct: 1, topic: "Reuse" },
      { q: "What is overriding?", options: ["Changing a variable type", "Defining a subclass method with same signature", "Using multiple constructors", "Calling static method"], correct: 1, topic: "Methods" },
      { q: "The super keyword is typically used to:", options: ["Create object arrays", "Access parent class members", "Delete object", "Handle exceptions"], correct: 1, topic: "Inheritance" },
    ]},
    { id: 'oop_test_3', name: 'Design Principles', difficulty: 'Hard', timeLimit: 15, questions: [
      { q: "SOLID principle 'S' stands for:", options: ["Safe Responsibility", "Single Responsibility", "Simple Reuse", "Structured Relation"], correct: 1, topic: "SOLID" },
      { q: "Programming to interfaces improves:", options: ["Tight coupling", "Flexibility and testability", "Memory usage only", "Compilation speed only"], correct: 1, topic: "Design" },
      { q: "Composition over inheritance is preferred when:", options: ["You need compile-time constants", "You want flexible behavior changes", "You cannot create objects", "Using primitive data only"], correct: 1, topic: "Architecture" },
      { q: "Dependency Inversion Principle says:", options: ["High-level modules should depend on low-level modules", "Both should depend on abstractions", "Low-level should depend on UI", "Avoid interfaces"], correct: 1, topic: "SOLID" },
      { q: "A class with many unrelated responsibilities violates:", options: ["Liskov Substitution", "Open/Closed", "Single Responsibility", "Interface Segregation"], correct: 2, topic: "Code Smells" },
    ]}
  ],
  sd: [
    { id: 'sd_test_1', name: 'System Design Essentials', difficulty: 'Easy', timeLimit: 10, questions: [
      { q: "What does scalability mean?", options: ["Running on one server", "Handling growth in traffic/data effectively", "Reducing code size", "Using SQL only"], correct: 1, topic: "Scalability" },
      { q: "Load balancer is mainly used to:", options: ["Encrypt database", "Distribute incoming traffic", "Compile code", "Create API docs"], correct: 1, topic: "Infrastructure" },
      { q: "Caching primarily helps by:", options: ["Increasing latency", "Reducing repeated expensive work", "Replacing database", "Compressing source code"], correct: 1, topic: "Caching" },
      { q: "Horizontal scaling means:", options: ["Adding bigger CPU to one machine", "Adding more machines", "Reducing memory", "Using one thread"], correct: 1, topic: "Scaling" },
      { q: "CDN is useful for:", options: ["Serving static content closer to users", "User authentication", "Database normalization", "Message queueing"], correct: 0, topic: "Performance" },
    ]},
    { id: 'sd_test_2', name: 'Databases, Queues & Reliability', difficulty: 'Medium', timeLimit: 14, questions: [
      { q: "Eventual consistency means:", options: ["Data is always strongly consistent instantly", "Replicas converge over time", "No replication exists", "Transactions are disabled"], correct: 1, topic: "Consistency" },
      { q: "A message queue helps to:", options: ["Tighten service coupling", "Decouple producers and consumers", "Store UI files", "Replace DNS"], correct: 1, topic: "Queues" },
      { q: "Replication in databases is used for:", options: ["Faster CSS rendering", "Improved availability/read scaling", "Code minification", "Local development"], correct: 1, topic: "Databases" },
      { q: "Rate limiting protects systems from:", options: ["Unlimited request abuse", "Disk fragmentation", "SQL joins", "CSS bugs"], correct: 0, topic: "Reliability" },
      { q: "Idempotent APIs are important because:", options: ["Repeated requests can be safely retried", "They always use GET", "They avoid auth", "They remove latency"], correct: 0, topic: "API Design" },
    ]},
    { id: 'sd_test_3', name: 'Design Trade-offs', difficulty: 'Hard', timeLimit: 18, questions: [
      { q: "CAP theorem trade-off under partition is between:", options: ["Consistency and Availability", "Latency and Throughput", "Storage and CPU", "Security and UX"], correct: 0, topic: "Distributed Systems" },
      { q: "Sharding a database mainly improves:", options: ["Vertical CPU only", "Data distribution and write scale", "Code readability", "API authentication"], correct: 1, topic: "Storage" },
      { q: "A circuit breaker pattern helps by:", options: ["Blocking all traffic forever", "Failing fast when downstream is unhealthy", "Adding indexes", "Reducing log size"], correct: 1, topic: "Resilience" },
      { q: "Strong consistency is usually preferred for:", options: ["Social feed likes only", "Bank account balances", "CDN static assets", "Analytics dashboards"], correct: 1, topic: "Use Cases" },
      { q: "In read-heavy workloads, a common optimization is:", options: ["Disable cache", "Add read replicas and cache", "Single-thread all requests", "Store all files in RAM manually"], correct: 1, topic: "Optimization" },
    ]}
  ]
};

const subjectTestPrefix = {
  dsa: 'DSA',
  os: 'OS',
  dbms: 'DBMS',
  cn: 'CN',
  aptitude: 'Aptitude',
  oop: 'OOP',
  sd: 'System Design',
};

const sanitizeQuestion = (question) => ({
  ...question,
  options: Array.isArray(question.options) ? [...question.options] : [],
});

const uniqueByQuestionText = (questions) => {
  const seen = new Set();
  return questions.filter((q) => {
    const key = q.q?.trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const buildTenQuestionsForTest = (subjectPool, testQuestions, testIndex) => {
  const baseQuestions = uniqueByQuestionText(testQuestions.map(sanitizeQuestion)).slice(0, 10);
  if (baseQuestions.length >= 10) return baseQuestions;

  const existing = new Set(baseQuestions.map((q) => q.q.trim()));
  const sanitizedSubjectPool = uniqueByQuestionText(subjectPool.map(sanitizeQuestion));
  const startOffset = (testIndex * 5) % Math.max(1, sanitizedSubjectPool.length);
  const rotatedPool = [
    ...sanitizedSubjectPool.slice(startOffset),
    ...sanitizedSubjectPool.slice(0, startOffset),
  ];

  for (const candidate of rotatedPool) {
    if (baseQuestions.length === 10) break;
    const key = candidate.q.trim();
    if (!existing.has(key)) {
      baseQuestions.push(candidate);
      existing.add(key);
    }
  }

  return baseQuestions.slice(0, 10);
};

export const testsData = Object.fromEntries(
  Object.entries(rawTestsData).map(([subjectId, tests]) => {
    const prefix = subjectTestPrefix[subjectId] || subjectId.toUpperCase();
    const subjectQuestionPool = tests.flatMap((test) => test.questions || []);
    const normalizedTests = tests.map((test, testIndex) => ({
      ...test,
      name: `${prefix} Practice Test ${testIndex + 1}`,
      questions: buildTenQuestionsForTest(subjectQuestionPool, test.questions || [], testIndex),
    }));
    return [subjectId, normalizedTests];
  })
);
