import { log } from 'console';
import a from './a.js'
import './css/index.css'
import './less/index.less'
import './scss/index.scss'
console.log(a);
console.log(111);
console.log(222);


const fn3 = () => {
    console.log('这是一个箭头函数');
}
fn3()

class Cat {
    constructor(name, age) {
        this.name = name 
        this.age = age
    }
}
const cat = new Cat('这是一只小猫', 19)

class Boy {
    height = '这是更加高级的语法'
    static weight = '120'
}

const boy1 = new Boy()
console.log(boy1)
console.log(Boy.weight)