## What does `HAVING` does in SQL?

Specifies a search condition for a group or an aggregate. `HAVING` can be used only with the `SELECT` statement. `HAVING` is typically used in a `GROUP BY` clause. When `GROUP BY` is not used, `HAVING` behaves like a `WHERE` clause.

### The semantics of Having

To better understand having, you need to see it from a theoretical point of view.

A group by is a query that takes a table and summarizes it into another table. You summarize the original table by grouping the original table into subsets (based upon the attributes that you specify in the group by).

The `HAVING` is simply equivalent to a `WHERE` clause after the group by has executed and before the select part of the query is computed.

Lets say your query is:

```sql
select a, b, count(*)
from Table
where c > 100
group by a, b
having count(*) > 10;
```

The evaluation of this query can be seen as the following steps:

Perform the `WHERE`, eliminating rows that do not satisfy it.
Group the table into subsets based upon the values of a and b (each tuple in each subset has the same values of a and b).
Eliminate subsets that do not satisfy the HAVING condition
Process each subset outputting the values as indicated in the `SELECT` part of the query. This creates one output tuple per subset left after step 3.
You can extend this to any complex query there Table can be any complex query that return a table (a cross product, a join, a UNION, etc).
