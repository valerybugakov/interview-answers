function LargeInteger(base)
{
	this.base = base;
	this.digits = new Array();
}
	// instance methods

	LargeInteger.prototype.add = function(other)
	{
		var numberOfDigitsInThis = this.digits.length;
		var numberOfDigitsInOther = other.digits.length;

		var numberOfDigitsGreater;

		if (numberOfDigitsInThis >= numberOfDigitsInOther)
		{
			numberOfDigitsGreater = numberOfDigitsInThis;
		}
		else
		{
			numberOfDigitsGreater = numberOfDigitsInOther;
		}

		var numberOfDigitsInSum = numberOfDigitsGreater + 1;

		this.expandNumberOfDigitsTo(numberOfDigitsInSum);
		other.expandNumberOfDigitsTo(numberOfDigitsInSum);

		var carryDigit = 0;

		for (var i = 0; i < numberOfDigitsInSum; i++)
		{
			var sumAtDigit = this.digits[i] + other.digits[i] + carryDigit;

			var digitValue = sumAtDigit % this.base;
			carryDigit = (sumAtDigit - digitValue) / this.base;

			this.digits[i] = digitValue;
		}

		this.removeLeadingZeroes();
		other.removeLeadingZeroes();

		return this;
	}

	LargeInteger.prototype.clone = function()
	{
		var returnValue = new LargeInteger(this.base);

		returnValue.overwriteWith(this);

		return returnValue;
	}

	LargeInteger.prototype.decrement = function()
	{
		return this.subtract(new LargeInteger(this.base).setFromInt(1));
	}

	LargeInteger.prototype.divide = function(other)
	{
		var dividend = this.clone();
		var divisor = other.clone();
		var base = dividend.base;

		var one = new LargeInteger(base).setFromInt(1);

		var lengthOfDivisorInDigits = divisor.digits.length;
		var differenceInLengths = dividend.digits.length - lengthOfDivisorInDigits;

		dividend.multiplyByBaseRaisedTo(lengthOfDivisorInDigits);
		divisor.multiplyByBaseRaisedTo(differenceInLengths + lengthOfDivisorInDigits);

		var result = new LargeInteger(base).setFromInt(0);

		while (divisor.digits.length > 0)
		{
			if (divisor.isLessThanOrEqualTo(dividend))
			{
				dividend.subtract(divisor);
				result.add(one);
			}
			else
			{
				divisor.divideByBaseRaisedTo(1);
				result.multiplyByBaseRaisedTo(1);
			}	
		}

		result.divideByBaseRaisedTo(2 * lengthOfDivisorInDigits);

		this.overwriteWith(result);

		return this;
	}

	LargeInteger.prototype.divideByBaseRaisedTo = function(exponent)
	{
		this.digits.splice(0, exponent);

		return this;
	}

	LargeInteger.prototype.expandNumberOfDigitsTo = function(numberOfDigitsTotal)
	{
		var numberOfDigitsToAdd = numberOfDigitsTotal - this.digits.length;
		for (var i = 0; i < numberOfDigitsToAdd; i++)
		{
			this.digits.push(0);	
		}

		return this;
	}

	LargeInteger.prototype.increment = function()
	{
		return this.add(new LargeInteger(this.base).setFromInt(1));
	}

	LargeInteger.prototype.isLessThanOrEqualTo = function(other)
	{
		var returnValue;
		var numberOfDigitsInThis = this.digits.length;
		var numberOfDigitsInOther = other.digits.length;

		if (numberOfDigitsInThis < numberOfDigitsInOther)
		{
			returnValue = true;
		}
		else if (numberOfDigitsInThis == numberOfDigitsInOther)
		{
			returnValue = true;

			for (var i = numberOfDigitsInThis - 1; i >= 0; i--)
			{
				var digitThis = this.digits[i];
				var digitOther = other.digits[i];

				if (digitThis > digitOther)
				{
					returnValue = false;
					break;
				}
				else if (digitThis < digitOther)
				{
					break;
				}			
			}
		}
		else
		{
			returnValue = false;
		}

		return returnValue;
	}

	LargeInteger.prototype.modulo = function(other)
	{
		var dividend = this.clone();
		var divisor = other.clone();

		var lengthOfDivisorInDigits = divisor.digits.length;
		var differenceInLengths = dividend.digits.length - lengthOfDivisorInDigits;

		var divisorOriginal = divisor.clone();
		divisor.multiplyByBaseRaisedTo(differenceInLengths);

		while (divisor.digits.length >= lengthOfDivisorInDigits)
		{
			if (divisor.isLessThanOrEqualTo(dividend))
			{
				dividend.subtract(divisor);
			}
			else
			{
				divisor.divideByBaseRaisedTo(1);
			}	
		}

		this.overwriteWith(dividend);

		return this;
	}

	LargeInteger.prototype.multiply = function(other)
	{
		var numberOfDigitsInThis = this.digits.length;
		var numberOfDigitsInOther = other.digits.length;		

		var numberOfDigitsInProduct = numberOfDigitsInThis + numberOfDigitsInOther; 
		var product = new LargeInteger(this.base).expandNumberOfDigitsTo(numberOfDigitsInProduct);

		for (var i = 0; i < numberOfDigitsInThis; i++)
		{
			var digitFromThis = this.digits[i];

			for (var j = 0; j < numberOfDigitsInOther; j++)
			{
				var digitFromOther = other.digits[j];

				var productOfDigits = 
					digitFromThis 
					* digitFromOther;

				var productDigitIndex = i + j;

				var carryDigit = productOfDigits; 

				while (carryDigit > 0)
				{
					var sumAtDigit = product.digits[productDigitIndex] + carryDigit;

					var digitValue = sumAtDigit % this.base;
					carryDigit = (sumAtDigit - digitValue) / this.base;

					product.digits[productDigitIndex] = digitValue;

					productDigitIndex++;
				}
			}
		}

		product.removeLeadingZeroes();
		this.overwriteWith(product);

		return this;
	}

	LargeInteger.prototype.multiplyByBaseRaisedTo = function(exponent)
	{
		for (var i = 0; i < exponent; i++)
		{
			this.digits.splice(0, 0, 0);
		}

		return this;
	}

	LargeInteger.prototype.overwriteWith = function(other)
	{
		var numberOfDigitsInThis = this.digits.length;
		var numberOfDigitsInOther = other.digits.length;

		for (var i = 0; i < numberOfDigitsInOther; i++)
		{
			this.digits[i] = other.digits[i];
		}

		if (numberOfDigitsInThis > numberOfDigitsInOther)
		{
			this.digits.splice
			(
				numberOfDigitsInOther, 
				numberOfDigitsInThis - numberOfDigitsInOther
			);
		}		

		return this;
	}

	LargeInteger.prototype.raiseToPower = function(exponent)
	{
		var result = this.raiseToPowerBySquaring(exponent);

		this.overwriteWith(result);

		return this;
	}

	LargeInteger.prototype.raiseToPowerBySquaring = function(exponent)
	{
		var returnValue = LargeInteger.raiseValueToPowerBySquaring
		(
			this.clone(), 
			exponent.clone(), 
			new LargeInteger(this.base).setFromInt(1),
			new LargeInteger(this.base).setFromInt(2)
		);

		return returnValue;
	}

	LargeInteger.raiseValueToPowerBySquaring = function
	(
		valueToRaise, exponent, constantOne, constantTwo
	)
	{
		var returnValue;

		if (exponent.digits.length == 1 && exponent.digits[0] == 1)
		{
			returnValue = valueToRaise;
		}
		else if (exponent.digits[0] % 2 == 0)
		{
			returnValue = LargeInteger.raiseValueToPowerBySquaring
			(
				valueToRaise.clone().multiply(valueToRaise), 
				exponent.clone().divide(constantTwo),
				constantOne,
				constantTwo
			);
		}
		else
		{
			returnValue = LargeInteger.raiseValueToPowerBySquaring
			(
				valueToRaise.clone().multiply(valueToRaise), 
				exponent.clone().subtract(constantOne).divide(constantTwo),
				constantOne,
				constantTwo
			).multiply
			(
				valueToRaise
			);
		}

		return returnValue;
	}

	LargeInteger.prototype.removeLeadingZeroes = function()
	{
		return this.removeLeadingZeroesDownTo(0);
	}

	LargeInteger.prototype.removeLeadingZeroesDownTo = function(numberOfDigitsTotal)
	{
		var i = this.digits.length - 1;

		while (i >= numberOfDigitsTotal && this.digits[i] == 0)
		{
			this.digits.splice(i, 1);	
			i--;
		}

		return this;
	}

	LargeInteger.prototype.setFromInt = function(valueToSet)
	{
		var d = 0;

		while (valueToSet > 0)
		{
			var digitValue = valueToSet % this.base;
			valueToSet = (valueToSet - digitValue) / this.base;
			this.digits[d] = digitValue;

			d++;
		}

		this.removeLeadingZeroes();

		return this;
	}

	LargeInteger.prototype.subtract = function(other)
	{
		var base = this.base;

		var numberOfDigitsInOther = other.digits.length;

		var numberOfDigitsInThis = this.digits.length;
		other.expandNumberOfDigitsTo(numberOfDigitsInThis);

		for (var i = 0; i < numberOfDigitsInOther; i++)
		{
			var digitFromThis = this.digits[i];
			var digitFromOther = other.digits[i];

			if (digitFromThis < digitFromOther)
			{
				var valueBorrowed = 0;
				var j = i;

				while (valueBorrowed == 0)
				{
					j++;

					var digitToBorrowFrom = this.digits[j];
					if (digitToBorrowFrom > 0)
					{
						valueBorrowed = base;
						this.digits[j]--;

						j--;
						while (j > i)
						{
							this.digits[j] = base - 1;
							j--;
						}
					}
				}

				digitFromThis += valueBorrowed;				
			}

			this.digits[i] = digitFromThis - digitFromOther;
		}

		this.removeLeadingZeroes();
		other.removeLeadingZeroes();

		return this;
	}

	LargeInteger.prototype.toInt = function()
	{
		var returnValue = 0;

		var placeMultiplierCurrent = 1;

		var numberOfDigits = this.digits.length;

		for (var i = 0; i < numberOfDigits; i++)
		{
			returnValue += this.digits[i] * placeMultiplierCurrent;

			placeMultiplierCurrent *= this.base;
		}

		return returnValue;
	}

	LargeInteger.prototype.toString = function()
	{
		var returnValue = "";

		var numberOfDigits = this.digits.length;

		for (var i = numberOfDigits - 1; i >= 0; i--)
		{
			returnValue += "" + this.digits[i];
		}

		return returnValue;
	}
  
const createInteger = n => new LargeInteger(10).setFromInt(n)
const one = createInteger(1)
const two = createInteger(2)
const mem = [one, one, two]

function factorial(n){
  console.log('boom')  
  if (mem[n]) {
//     console.log('omg:', mem[n], mem[n].toString())
    return mem[n].toString()
  }
  
  console.log('boom')
  
  for (let i = mem.length; i <= n; i++) {
//     console.log(mem[i - 1])
//     const copy = Object.assign(mem[i - 1])
    console.log(mem[i - 1].toString())
    const copy = createInteger(mem[i - 1].toString())
    const res = copy.multiply(createInteger(i))
//     console.log(copy.toString())
//     console.log(res.toString())
//     console.log('-----')
    mem.push(res) 
  }
  
  console.log(mem.length)
  
//   console.log(mem.map(item => item.toString()))
  console.log(mem[n])
  
  return mem[n].toString()
}
