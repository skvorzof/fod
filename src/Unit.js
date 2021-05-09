export class Unit {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.ava = data.ava;
    this.count = 0;

    const right = document.querySelector('.right');

    const group = document.createElement('div');
    group.className = 'group';
    right.appendChild(group);

    const res = document.createElement('div');
    res.className = 'res';
    res.id = 'unit' + this.id;
    res.textContent = 0;
    group.appendChild(res);

    const ava = document.createElement('div');
    ava.className = 'ava';
    ava.textContent = this.ava;
    group.appendChild(ava);

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = this.name;
    group.appendChild(name);
  }
  counter(res) {
    const unit = document.querySelector('#unit' + this.id);
    //Банкрот
    if (res === 1) {
      res = 0;
      this.count = 0;
    }
    //x2
    if (res === 2) {
      res = 0;
      this.count *= 2;
    }
    unit.textContent = this.count += res;
  }
}
