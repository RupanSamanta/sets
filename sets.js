class Sets {
  union(a, b) {
    let s = new Set();
    a.forEach((value)=> {
        s.add(value)
    });
    b.forEach((value)=> {
        s.add(value)
    });
    return s;
  }
  intersection(a, b) {
    let s = new Set();
    a.forEach((value)=>{
        if (b.has(value))
            s.add(value)
    });
    return s;
  }
  difference(a, b) {
    let s = new Set();
    a.forEach((values)=>{
        if (!b.has(values))
            s.add(values)
    });
    return s;
  }
  n(a) {
    let i = 0;
    a.forEach(()=> i++);
    return i;
  }
  equivalent(a, b) {
    let ai = 0, bi = 0;
    a.forEach(()=> ai++);
    b.forEach(()=> bi++);
    return ai == bi;
  }
  equal(a, b) {
    let ai = 0, bi = 0;
    a.forEach(()=> ai++);
    b.forEach(()=> bi++);
    if (ai != bi)
      return false; 
    let type = true;
    a.forEach((value)=> {
        if (!b.has(value))
            type = false;
    });
    return type;
  }
  subset(a, b) {
    let type = true;
    a.forEach((value)=> {
        if (!b.has(value))
            type = false;
    });
    return type;
  }
  countSet(a) {
    let i = 0;
    a.forEach(()=> i++);
    return parseInt(Math.pow(2, i));
  }
  powerSet(a) {
    let pow = new Set();
    let n = parseInt(Math.pow(2, a.size));
    for (let i=0; i<n; i++) {
      let sub = new Set();
      Array.from(a).forEach((v, j)=> {
        if (i & (1 << j))
          sub.add(v);
      });
      pow.add(sub);
    }
    return pow;
  }
  symDifference(a, b) {
    let sd = new Set();
    a.forEach((value)=> {
      if (!b.has(value))
        sd.add(value);
    });
    b.forEach((value)=> {
      if (!a.has(value))
        sd.add(value);
    });
    return sd;
  }
  complement(a, b) {
    let s = new Set();
    b.forEach((value)=>{
      if (!a.has(value))
        s.add(value);
    });
    return s;
  }
  setToArray(a) {
    let arr = [];
    a.forEach((value)=> {
      arr.push(value);
    });
    return arr;
  }
  arrayToSet(a) {
    let s = new Set();
    for (let i of a)
      s.add(i)
    return s;
  }
  cartesianProduct(a, b) {
    let s = new Set();
    a.forEach((av)=> {
      b.forEach((bv)=> {
        s.add([av, bv])
      });
    });
    return s;
  }
}
