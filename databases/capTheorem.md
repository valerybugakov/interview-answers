# What is CAP Theorem?

CAP theorem is designed for distributed file systems(collection of interconnected nodes).
CAP Theorem also known as Brewer’s theorem and used to distributed consistency.
it contains follwing three technical terms for distributed systems.

C – *Consistency*

A – *Availability*

P – *Partition Tolerance*

### Consistency:

When you read data it will give same data how many times read and server send response each and every request but systems always consistent when read data.(all node having same data)

### Availability:

It means all requests give response and no error accured in this systems.

### Partition Tolerance:

All functions run all time when more nodes not responsive and commnication break between two nodes

It's theoretically impossible to have all 3 requirements met, so a combination of 2 must be chosen and this is usually the deciding factor in what technology is used.

When it comes to distributed databases, the two choices are only AP or CP because if it's not partition tolerant,
it's not really a reliable distributed database.
So the choice is simpler:
* if a network split happens, do you want the database to keep answering but with possibly old/bad data (AP)?
* Or should it just stop responding unless you can get the absolute latest copy (CP)?

# ACID

This describes a set of properties that apply to data transactions, defined as follows:

**Atomicity** - Everything in a transaction must happen successfully or none of the changes are committed. This avoids a transaction that changes multiple pieces of data from failing halfway and only making a few changes.

**Consistency** - The data will only be committed if it passes all the rules in place in the database (ie: data types, triggers, constraints, etc).

**Isolation** - Transactions won't affect other transactions by changing data that another operation is counting on; and other users won't see partial results of a transaction in progress (depending on isolation mode).

**Durability** - Once data is committed, it is durably stored and safe against errors, crashes or any other (software) malfunctions within the database.

# Tying it all together

**CAP** provides the *basic requirements that a distributed system must follow* and **ACID** is a *set of rules that a database can choose to follow that guarantees how it handles transactions and keeps data safe*.

* There are lots of options other than relational databases for storing more or different kinds of data and they often use a distributed set of servers working together and are designed either for AP or CP under the CAP theorem. 
* When it comes to how safe the committed data is, any ACID compliant system can be considered reliable.
