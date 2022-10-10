class Sys {
	static print(val: any) {
		console.log(JSON.stringify(val, null, 2));
	}
}

class Primitive {
  private data: string | number;
  type: string;
  constructor(value: string | number) {
    this.data = value;
    this.type = 'Primitive';
  }
  get value() {
    return this.data;
  }
}

class Int extends Primitive {
  constructor(value: number) {
    super(Math.floor(value));
    this.type = 'Int';
  }
}

class Char extends Primitive {
  constructor(value: string) {
    super(value[0]);
    this.type = 'Char';
  }
}

class Float extends Primitive {
  constructor(value: number) {
    super(value);
    this.type = 'Float';
  }
}

class MString extends Primitive {
  constructor(value: string) {
    super(value);
    this.type = 'MString';
  }
}

class Mononode {
  value: Primitive;
  next: Mononode | null;
  constructor(value: Primitive) {
    this.value = value;
    this.next = null;
  }
}

class Dinode {
  value: Primitive;
  next: Dinode | null;
  prev: Dinode | null;
  constructor(value: Primitive) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Pair {
  value: [Primitive, Primitive];
  constructor(x: Primitive, y: Primitive) {
    this.value = [x, y];
  }
	swap() {
		this.value = [this.value[1], this.value[0]];
	}
}

class Stack {
	top: Primitive | null;
	constructor() {
		this.top = null;
	};
}

