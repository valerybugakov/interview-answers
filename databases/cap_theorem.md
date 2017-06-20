# What is CAP Theorem?

CAP theorem is designed for distributed file systems(collection of interconnected nodes).
CAP Theorem also known as Brewer’s theorem and used to distributed consistency.
it contains follwing three technical terms for distributed systems.

C – Consistency

A – Availability

P – Partition Tolerance

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
