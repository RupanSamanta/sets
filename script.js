const obj = new Sets();
var SETS = [];
$(document).ready(()=> {
  retrieve();
  setMethod();
  $('#done').click(()=> {
    setUniversal();
    printDetails();
    setOptions();
    setRelation();
    subPowerSet();
    operationOnSet();
    complementSet();
    cartesian();
    MathJax.typeset();
  });
  $('#reset').click(()=> {
    dialogBox(
      {
        text: 'Confirm Reset!',
        type: 'confirm',
        okay: ()=> {
          setTimeout(()=> {
          let is = $('#input-sets');
          if (is.children('form').length > 3)
            is.children('form').eq(
              is.children('form'
            ).length - 2).remove();
            $('#input-sets .input').each((i, v)=> {
            v.innerHTML = `<input type="text" name="sets">`;
          });
            setMethod();
          }, 500);
        }
      }
    );
  });
  $('#add').click(()=> {
    dialogBox(
      {
        text: 'Add New Set',
        type: 'prompt',
        okay: ()=> {
          $('#add-form').append(
            `<form>        
              <label>
                <span>${$('#dialog-box-input').val()} = {</span>
                <span class="input">
                  <input type="text" name="sets"></span>
                <span>}</span>
              </label>
            </form>`
          );
          setMethod();
        }
      }
    );
  });
  $('.select-set select').change(()=> {
    setRelation();
    MathJax.typeset();
  });
  $('.select-set select').eq(2).change(()=> {
    subPowerSet();
    MathJax.typeset();
  });
  [
    "Union", "Intersection", "Difference",
    "Symmetric Difference"
  ].forEach((v, i)=> {
    $('#sect-operation').append(
      `<fieldset class="operations">
        <legend>${v}</legend>
        <p></p>
      </fieldset>`
    )
  });
  $('#sect-operation').append(
      `<fieldset id="complement">
        <legend>Complement</legend>
        <select class="select"></select>
        <p></p>
      </fieldset>`
  )
  $('#operation select').change(()=> {
    operationOnSet();
    MathJax.typeset();
  });
  $('#complement select').change(()=> {
    complementSet();
    MathJax.typeset();
  });
  $('#cartesian select').change(()=> {
    cartesian();
    MathJax.typeset();
  });
});

function setMethod() {
  for (let i of $('.input input')) {
    i.addEventListener
    ('input', ()=> {
      resize(i);
    });
    i.addEventListener
    ('keydown', (evn)=> 
      { addOrRemove(i, evn) }
    );
  }
}
function resize(e) {
  e.style.width = 
    (e.value.length + 0.5) + 'ch'
}
function addOrRemove(e, evn) {
  let key = evn.key;
  if (key === 'Enter') {
    e.blur();
    let inp = document.createElement('input');
    inp.setAttribute('type', 'text');
    inp.addEventListener
    ('input', ()=> {
      resize(inp);
     /* if ($(e).parent().attr('id') != "universal")
        setUniversal();*/
    });      
    inp.addEventListener
    ('keydown', (evn)=> 
      { addOrRemove(inp, evn) }
    );
    $(e).parent().append
    (`<span>,</span>`);
    $(e).parent().append(inp);
    $(e).parent().children()
    .last().focus();
  }
  else if (key === "Backspace" || key === "Delete") {
    if ($(e).val().length == 0 && $(e).parent().children().length > 1) {
      $(e).parent().children("span")
      .last().remove();
      $(e).remove();
    }
  }
}
function printDetails() {
  if ($('#print-set p').length>0)
    for (let i of $('#print-set p'))
      i.remove();
  SETS = [];
  $('.input').each((key, val)=> {
    SETS.push(['',new Set()]);
    for (let j of $(val).children('input'))
      if (j.value.length != 0)
        SETS[key][1].add(j.value.trim());
  });
  $('.input').each((key, elem)=> {
    let set = SETS[key][1];
    SETS[key][0] = $(elem).parent().children().first().text()[0];
    let str = `$$\\text{${SETS[key][0]}} = \\{`;
    set.forEach((val)=> {
      str += val + ', ';
    });
    if (set.size != 0)
      str = str.substring(0, str.length - 2);
    $('#print-set').append(
      `<p>${str}\\}$$</p>`
    );
  });
}
function setUniversal() {
  let s = new Set();
  for (let i of $('.input input'))
    if (i.value.length != 0)
      s.add(i.value);
  $('#universal').html('');
  obj.setToArray(s).forEach((value, index)=> {
    let inp = document.createElement('input');
    inp.setAttribute('type', 'text');
    inp.setAttribute('value', value.trim());
    inp.style.width = (value.length + 0.42) + 'ch';
    inp.addEventListener
    ('input', ()=> {
      inp.style.width = 
      (inp.value.length + 0.5) + 'ch'
    });
    inp.addEventListener
    ('keydown', (evn)=> 
      { addOrRemove(inp, evn) }
    );
    if (index != 0)
      $('#universal').append(`<span>,</span>`);
    $('#universal').append(inp);
  });
  if ($('#universal input').length == 0) {
    $('#universal').append(
      `<input type="text" name="sets">`
    );
    setMethod();
  }
}
function setOptions() {
  for (let i of $('select')) {
    i.innerHTML = "";
    SETS.forEach((value, index)=> {
      let opt = document.createElement('option');
      opt.innerHTML = value[0];
      opt.setAttribute('value', index);
      i.appendChild(opt);
    });
  }
  [
    $('.select-set'),
    $('#operation'),
    $('#cartesian')
  ].forEach((e)=> {
    $(e).children('select').eq(1).val(1).change();
  });
}
function setRelation() {
  let index = [];
  for (let i of $('.select-set').eq(0).children('select'))
    index.push(i.value);
  let name = [], set = [];
  index.forEach((val)=> {
    name.push(SETS[val][0])
    set.push(SETS[val][1]);
  });
  let n = [
    obj.n(set[0]), obj.n(set[1])
  ];
  let sign = obj.equivalent(set[0], set[1]) ? '\\leftrightarrow' : '\\nleftrightarrow';
  let exp = [
    `$$\\text{n}(${name[0]}) = ${n[0]}$$
       $$\\text{n}(${name[1]}) = ${n[1]}$$
       $$${name[0]} ${sign} ${name[1]}$$`,
    `$$${name[0]} 
       ${obj.equal(set[0], set[1]) ? '=' : '\\ne'} 
       ${name[1]}$$`,
    `$$x \\in ${name[0]} \\; ${obj.subset(set[0], set[1]) ? '\\Rightarrow' : '\\nRightarrow'}
       \\; x \\in ${name[1]}$$
       $$\\therefore \\;${name[0]} 
       ${obj.subset(set[0], set[1]) ? '\\subset' : '\\not\\subset'} 
       ${name[1]}$$
       <p>$$\\text{No. of Subsets of ${name[0]}} = 2^{${n[0]}} = ${obj.countSet(set[0])}$$ 
       $$\\text{No. of Subsets of ${name[1]}} = 2^{${n[1]}} = ${obj.countSet(set[1])}
       $$</p>`
  ];
  index = 0;
  for (let i of $('.relation')) {
    for(let j of $(i).children('p'))
      j.remove();
    $(i).append(
      `<p>${exp[index++]}</p>`
    )
  }
}
function subPowerSet() {
  let str = "";
  let s = SETS[$('.select-set select').eq(2).val()];
  let arr = obj.setToArray(
    obj.powerSet(s[1])
  ).sort((a, b)=> {
    return a.size - b.size
  });
  arr.forEach((val, ind)=> {
    if (val.size == 0)
      str += '\\varnothing';
    else {
      str += '\\{';
      val.forEach((v)=> {
        str += v + ', ';
      });
      if (str.indexOf(',') != -1)
        str = str.substring(0, str.length - 2);
      str += '\\}';
    }
    str += ', ';
  });
  str = str.substring(0, str.lastIndexOf(','));
  for(let i of $('.sub-pow').children('p'))
      i.remove();
  $('#subsets legend').html('Subsets of ' + s[0]);
  $('#subsets').append(`<p>$$${str}$$</p>`);
  $('#power').append(`
    <p>$$\\text{P}(${s[0]}) = \\{${str}\\}$$</p>
  <p>$$\\text{No. of Power Sets} = 2^{${obj.n(s[1])}} = ${obj.countSet(s[1])}$$</p>
  `);
}
function operationOnSet() {
  let set = [];
  $('#operation select').each((i, e)=> {
    set.push(
      [SETS[e.value][0], SETS[e.value][1]]
    );
  });
  let str = [
    [obj.union(set[0][1],set[1][1]),[]],
    [obj.intersection(set[0][1],set[1][1]),[]],
    [obj.difference(set[0][1],set[1][1]),[]],
    [obj.symDifference(set[0][1],set[1][1]),[]]
  ];
  str.forEach((val, ind)=> {
    str[ind][1] = "";
    if (val[0].size == 0)
      str[ind][1] = '\\varnothing';
    else {
      val[0].forEach((v, i)=> {
        str[ind][1] += v + ', ';
      });
      str[ind][1] = '\\{' + str[ind][1].substring(0, str[ind][1].lastIndexOf(',')) + '\\}';
    }
  });
  let exp = [
    '\\cup', '\\cap', '-', '\\;\\Delta\\;'
  ];
  $('.operations p').each((i, e)=> {
    e.innerHTML = `$$\\text{${set[0][0]}} ${exp[i]} \\text{${set[1][0]}} = ${str[i][1]}$$`;
  });
}
function complementSet() {
  let set = SETS[$('#complement select').val()];
  let str = "";
  let com = obj.complement(set[1], SETS[SETS.length-1][1]);
  if (obj.n(com) != 0) {
    str += '\\{';
    com.forEach((val)=> {
      str += val + ', ';
    });
    str = str.substring(0, str.lastIndexOf(',')) + '\\}';
  }
  else
    str += '\\varnothing';
  $('#complement p').html('');
  $('#complement p').append(`
    $$\\text{${set[0]}'} = ${str}$$
  `);
}
function dialogBox(object) {
  $('template').eq(0).contents().clone().appendTo('body');
  $('.dialog-box').addClass(object.type);
  $('.dialog-box #message').text(object.text);
  $('.dialog-box #confirm').click(object.okay);
  $('.dialog-box #cancel').click(object.cancel);
  $('.dialog-box button').click(()=> {
    setTimeout(()=> {
      $('.dialog-box').css(
        'transform', 'scale(0)'
      );
      $('.dialog-box-cover').css(
        'opacity', 0
      );
      setTimeout(()=> {
        $('.dialog-box-cover').last().remove();
      }, 300);
    }, 500);
  });
}
function cartesian() {
  let set = [
    SETS[$('#cartesian select').eq(0).val()],
    SETS[$('#cartesian select').eq(1).val()]
  ],
  cart = obj.cartesianProduct(
    set[0][1], set[1][1]
  ),
  str = "";
  cart.forEach((val)=> {
    str += `(${val.toString()}), `
  });
  if (str.length == 0)
    str = '\\varnothing';
  else
    str = `\\{${str.substring(0, str.lastIndexOf(','))}\\}`;
  $('#cartesian-product p').remove();
  $('#cartesian-product').append(
    `<p> $$ \\text{${set[0][0]}} \\times \\text{${set[1][0]}} = ${str} $$
    </p>`,
    `<p>$$\\text{No. of Elements of ${set[0][0]}} \\times \\text{${set[1][0]}}$$
      $$\\text{n(${set[0][0]})} = ${obj.n(set[0][1])}$$
      $$\\text{n(${set[1][0]})} = ${obj.n(set[1][1])}$$
      $$\\text{n(${set[0][0]}} \\times \\text{${set[1][0]})} = ${obj.n(cart)}$$
    </p>`
  );
}
function retrieve() {
 if (localStorage.getItem('visit') == null) {
    dialogBox(
      {
        text: `Welcome to SETS`,
        type: 'alert'
      }
    );
    localStorage.setItem("visit", 1);
  }
  else {
    localStorage.setItem("visit", 
     Number(localStorage.getItem("visit"))+1
    );
  }
}
