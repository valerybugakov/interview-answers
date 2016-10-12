## What does `* { box-sizing: border-box; }` do? What are its advantages?
It ebables all elements to include paddings and borders in its width.

You might want to divide up my grid with 50% or 20% columns, but want to add padding via `px` or `em`. 
Without `calc()` this is impossible… unless you use `border-box`. 
Another good one is applying `100%` width and then wanting to add a padding to that element.
