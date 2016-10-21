## How indexes work in databases?

### What would happen without an index on the table?

Once we run that query, what exactly goes on behind the scenes to find employees who are named Jesus? Well, the database software would literally have to look at every single row in the Employee table to see if the Employee_Name for that row is ‘Jesus’. And, because we want every row with the name ‘Jesus’ inside it, we can not just stop looking once we find just one row with the name ‘Jesus’, because there could be other rows with the name Jesus. So, every row up until the last row must be searched – which means thousands of rows in this scenario will have to be examined by the database to find the rows with the name ‘Jesus’. This is what is called a full table scan.

### How a database index can help performance

You might be thinking that doing a full table scan sounds inefficient for something so simple – shouldn’t software be smarter? It’s almost like looking through the entire table with the human eye – very slow and not at all sleek. But, as you probably guessed by the title of this article, this is where indexes can help a great deal. The whole point of having an index is to speed up search queries by essentially cutting down the number of records/rows in a table that need to be examined.

### What is an index?

So, what is an index? Well, an index is a data structure (most commonly a B- tree) that stores the values for a specific column in a table. An index is created on a column of a table. So, the key points to remember are that an index consists of column values from one table, and that those values are stored in a data structure. The index is a data structure – remember that.

### What kind of data structure is an index?

B- trees are the most commonly used data structures for indexes. The reason B- trees are the most popular data structure for indexes is due to the fact that they are time efficient – because look-ups, deletions, and insertions can all be done in logarithmic time. And, another major reason B- trees are more commonly used is because the data that is stored inside the B- tree can be sorted. The RDBMS typically determines which data structure is actually used for an index. But, in some scenarios with certain RDBMS’s, you can actually specify which data structure you want your database to use when you create the index itself.

### How does a hash table index work?

Hash tables are another data structure that you may see being used as indexes – these indexes are commonly referred to as hash indexes. The reason hash indexes are used is because hash tables are extremely efficient when it comes to just looking up values. So, queries that compare for equality to a string can retrieve values very fast if they use a hash index. For instance, the query we discussed earlier (SELECT * FROM Employee WHERE Employee_Name = ‘Jesus’) could benefit from a hash index created on the Employee_Name column. The way a hash index would work is that the column value will be the key into the hash table and the actual value mapped to that key would just be a pointer to the row data in the table. Since a hash table is basically an associative array, a typical entry would look something like “Jesus => 0x28939”, where 0x28939 is a reference to the table row where Jesus is stored in memory. Looking up a value like “Jesus” in a hash table index and getting back a reference to the row in memory is obviously a lot faster than scanning the table to find all the rows with a value of “Jesus” in the Employee_Name column.

### The disadvantages of a hash index

Hash tables are not sorted data structures, and there are many types of queries which hash indexes can not even help with. For instance, suppose you want to find out all of the employees who are less than 40 years old. How could you do that with a hash table index? Well, it’s not possible because a hash table is only good for looking up key value pairs – which means queries that check for equality (like “WHERE name = ‘Jesus'”). What is implied in the key value mapping in a hash table is the concept that the keys of a hash table are not sorted or stored in any particular order. This is why hash indexes are usually not the default type of data structure used by database indexes – because they aren’t as flexible as B- trees when used as the index data structure. Also see: Binary trees versus Hash Tables.

### What are some other types of indexes?

Indexes that use a R- tree data structure are commonly used to help with spatial problems. For instance, a query like “Find all of the Starbucks within 2 kilometers of me” would be the type of query that could show enhanced performance if the database table uses a R- tree index.

Another type of index is a bitmap index, which work well on columns that contain Boolean values (like true and false), but many instances of those values – basically columns with low selectivity.

### How does an index improve performance?

Because an index is basically a data structure that is used to store column values, looking up those values becomes much faster. And, if an index is using the most commonly used data structure type – a B- tree – then the data structure is also sorted. Having the column values be sorted can be a major performance enhancement – read on to find out why.

Let’s say that we create a B- tree index on the Employee_Name column This means that when we search for employees named “Jesus” using the SQL we showed earlier, then the entire Employee table does not have to be searched to find employees named “Jesus”. Instead, the database will use the index to find employees named Jesus, because the index will presumably be sorted alphabetically by the Employee’s name. And, because it is sorted, it means searching for a name is a lot faster because all names starting with a “J” will be right next to each other in the index! It’s also important to note that the index also stores pointers to the table row so that other column values can be retrieved – read on for more details on that.

### What exactly is inside a database index?

So, now you know that a database index is created on a column in a table, and that the index stores the values in that specific column. But, it is important to understand that a database index does not store the values in the other columns of the same table. For example, if we create an index on the Employee_Name column, this means that the Employee_Age and Employee_Address column values are not also stored in the index. If we did just store all the other columns in the index, then it would be just like creating another copy of the entire table – which would take up way too much space and would be very inefficient.

### An index also stores a pointer to the table row

So, the question is if the value that we are looking for is found in an index (like ‘Jesus’) , how does it find the other values that are in the same row (like the address of Jesus and his age)? Well, it’s quite simple – database indexes also store pointers to the corresponding rows in the table. A pointer is just a reference to a place in memory where the row data is stored on disk. So, in addition to the column value that is stored in the index, a pointer to the row in the table where that value lives is also stored in the index. This means that one of the values (or nodes) in the index for an Employee_Name could be something like (“Jesus”, 0x82829), where 0x82829 is the address on disk (the pointer) where the row data for “Jesus” is stored. Without that pointer all you would have is a single value, which would be meaningless because you would not be able to retrieve the other values in the same row – like the address and the age of an employee.

### How does a database know when to use an index?

When a query like “SELECT * FROM Employee WHERE Employee_Name = ‘Jesus’ ” is run, the database will check to see if there is an index on the column(s) being queried. Assuming the Employee_Name column does have an index created on it, the database will have to decide whether it actually makes sense to use the index to find the values being searched – because there are some scenarios where it is actually less efficient to use the database index, and more efficient just to scan the entire table. Read this article to understand more about those scenarios: Selectivity in SQL.
