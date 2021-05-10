export class Unit {
  constructor(data) {
    this.active = false;
    this.id = data.id;
    this.name = data.name;
    this.ava = data.ava;
    this.count = 0;

    const right = document.querySelector('.right');

    const group = document.createElement('div');
    group.className = 'group';
    right.appendChild(group);

    if (this.active) {
      group.classList.add('active');
    }

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

  counter(num) {
    const unit = document.querySelector('#unit' + this.id);
    if (num === 0) {
      this.cur = false;
    }

    //Банкрот
    if (num === 1) {
      num = 0;
      this.count = 0;
      this.cur = false;
    }
    //x2
    if (num === 2) {
      num = 0;
      this.count *= 2;
    }
    unit.textContent = this.count += num;
  }

  toogleActive(status) {
    const unit = document.querySelector('#unit' + this.id);

    this.active = status;
    if (this.active) {
      unit.classList.add('active');
    } else {
      unit.classList.remove('active');
    }
  }

  setActive() {
    this.toogleActive(true);
  }

  removeActive() {
    this.toogleActive(false);
  }
}
