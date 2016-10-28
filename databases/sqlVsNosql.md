## SQL vs NoSQL

In the world of database technology, there are two main types of databases: SQL and NoSQL—or, relational databases and non-relational databases. The difference speaks to how they’re built, the type of information they store, and how they store it. Relational databases are structured, like phone books that store phone numbers and addresses. Non-relational databases are document-oriented and distributed, like file folders that hold everything from a person’s address and phone number to their Facebook likes and online shopping preferences.

We call them SQL and NoSQL, referring to whether or not they’re written solely in structured query language (SQL). In this article, we’ll explore what SQL is, how it makes these databases different, and how each type structures the data it holds so you can easily determine which type is right for you.

Image for SQL vs. NoSQL Databases: What’s the Difference?
Email LikeShareShareTweetPin It
In the world of database technology, there are two main types of databases: SQL and NoSQL—or, relational databases and non-relational databases. The difference speaks to how they’re built, the type of information they store, and how they store it. Relational databases are structured, like phone books that store phone numbers and addresses. Non-relational databases are document-oriented and distributed, like file folders that hold everything from a person’s address and phone number to their Facebook likes and online shopping preferences.

We call them SQL and NoSQL, referring to whether or not they’re written solely in structured query language (SQL). In this article, we’ll explore what SQL is, how it makes these databases different, and how each type structures the data it holds so you can easily determine which type is right for you.

### SQL: RELATIONAL DATABASES

First, let’s take a look at one of the main features that separates these two systems: the way they structure data. A relational database—or, an SQL database, named for the language it’s written in, Structured Query Language (SQL)—is the more rigid, structured way of storing data, like a phone book. Developed by IBM in the 1970s, a relational database consists of two or more tables with columns and rows. Each row represents an entry, and each column sorts a very specific type of information, like a name, address, and phone number. The relationship between tables and field types is called a schema. In a relational database, the schema must be clearly defined before any information can be added.

For a relational database to be effective, the data you’re storing in it has to be structured in a very organized way. A well-designed schema minimizes data redundancy and prevents tables from becoming out-of-sync, a critical feature for many businesses, especially those that record financial transactions. A poorly designed schema can result in organizational headaches due to its rigidity. For example, a column designed to store U.S. phone numbers might require 10 digits because that’s the standard for phone numbers in the U.S. This has the advantage of rejecting any invalid values (for example, if a number is missing an area code). However, if you need to change the schema (for instance, if you need to include an international phone number entry with more than 10 digits), then the entire database needs to be edited. Key takeaway: excellent organization results in a compromise in flexibility with a relational database.

Structured Query Language (SQL) is a programming language used by database architects to design relational databases. In an SQL database like MySQL, Sybase, Oracle, or IBM DM2, SQL executes queries, retrieves data, and edits data by updating, deleting, or creating new records. SQL is a lightweight, declarative language that does a lot of heavy lifting for the relational database, acting like a database’s version of a server-side script. One particular advantage of SQL is its simple-yet-powerful JOIN clause, which allows developers to retrieve related data stored across multiple tables with a single command.

Another reason SQL databases remain popular is that they fit naturally into many venerable software stacks, including LAMP and Ruby-based stacks. These databases are well understood and widely supported, which can be a major advantage if you run into problems.

### NOSQL DATABASES: NON-RELATIONAL & DISTRIBUTED DATA

If your data requirements aren’t clear at the outset or if you’re dealing with massive amounts of unstructured data, you may not have the luxury of developing a relational database with clearly defined schema. Enter non-relational databases, which offer much greater flexibility than their traditional counterparts. Think of non-relational databases more like file folders, assembling related information of all types. If a WordPress blog used a NoSQL database, each file could store data for a blog post: social likes, photos, text, metrics, links, and more.

Unstructured data from the web can include sensor data, social sharing, personal settings, photos, location-based information, online activity, usage metrics, and more. Trying to store, process, and analyze all of this unstructured data led to the development of schema-less alternatives to SQL. Taken together, these alternatives are referred to as NoSQL, meaning “Not only SQL.” While the term NoSQL encompasses a broad range of alternatives to relational databases, what they have in common is that they allow you to treat data more flexibly.

How do NoSQL databases work? Instead of tables, NoSQL databases are document-oriented. This way, non-structured data (such as articles, photos, social media data, videos, or content within a blog post) can be stored in a single document that can be easily found but isn’t necessarily categorized into fields like a relational database does. It’s more intuitive, but note that storing data in bulk like this requires extra processing effort and more storage than highly organized SQL data. That’s why Hadoop, an open-source computing and data analysis platform capable of processing huge amounts of data in the cloud, is so popular in conjunction with NoSQL database stacks.

NoSQL databases offer another major advantage, particularly to app developers: ease of access. Relational databases have a fraught relationship with applications written in object-oriented programming languages like Java, PHP, and Python. NoSQL databases are often able to sidestep this problem through APIs, which allow developers to execute queries without having to learn SQL or understand the underlying architecture of their database system.

Having heard the term “NoSQL”, you could be forgiven for thinking all technologies under this umbrella have the same data model. In fact, NoSQL refers to a whole host of technologies, which store and process data in different ways. Some of the main ways include:

- Document Databases

  Instead of storing data in rows and columns in a table, data is stored in documents, and these documents are grouped together in collections. Each document can have a completely different structure. Document databases include the aforementioned CouchDB and MongoDB.

- Key-Value Stores

  Data is stored in an associative array of key-value pairs. The key is an attribute name, which is linked to a value. Well-known key value stores include Redis, Voldemort (developed by LinkedIn) and Dynamo (developed by Amazon).

- Graph Databases

  Used for data whose relations are represented well in a graph. Data is stored in graph structures with nodes (entities), properties (information about the entities) and lines (connections between the entities). Examples of this type of database include Neo4J and InfiniteGraph.

- Columnar (or Wide-Column) Databases

  Instead of ‘tables’, in columnar databases you have column families, which are containers for rows. Unlike RDBMS, you don’t need to know all of the columns up front, each row doesn’t have to have the same number of columns. Columnar databases are best suited to analysing huge datasets- big names include Cassandra and HBase.
  
### REASONS TO USE A SQL DATABASE

When it comes to database technology, there’s no one-size-fits-all solution. That’s why many businesses rely on both relational and nonrelational databases for different tasks. Even as NoSQL databases gain popularity for their speed and scalability, there are still situations where a highly structured SQL database may be preferable. Here are a few reasons you might choose an SQL database:

You need to ensure ACID compliancy (Atomicity, Consistency, Isolation, Durability). ACID compliancy reduces anomalies and protects the integrity of your database by prescribing exactly how transactions interact with the database. Generally, NoSQL databases sacrifice ACID compliancy for flexibility and processing speed, but for many e-commerce and financial applications, an ACID-compliant database remains the preferred option.
Your data is structured and unchanging. If your business is not experiencing massive growth that would require more servers and you’re only working with data that’s consistent, then there may be no reason to use a system designed to support a variety of data types and high traffic volume.

### REASONS TO USE A NOSQL DATABASE

When all of the other components of your server-side application are designed to be fast and seamless, NoSQL databases prevent data from being the bottleneck. Big data is the real NoSQL motivator here, doing things that traditional relational databases cannot. It’s driving the popularity of NoSQL databases like MongoDB, CouchDB, Cassandra, and HBase.

Storing large volumes of data that often have little to no structure. A NoSQL database sets no limits on the types of data you can store together, and allows you to add different new types as your needs change. With document-based databases, you can store data in one place without having to define what “types” of data those are in advance.
Making the most of cloud computing and storage. Cloud-based storage is an excellent cost-saving solution, but requires data to be easily spread across multiple servers to scale up. Using commodity (affordable, smaller) hardware on-site or in the cloud saves you the hassle of additional software, and NoSQL databases like Cassandra are designed to be scaled across multiple data centers out of the box without a lot of headaches.
Rapid development. If you’re developing within two-week Agile sprints, cranking out quick iterations, or needing to make frequent updates to the data structure without a lot of downtime between versions, a relational database will slow you down. NoSQL data doesn’t need to be prepped ahead of time.
