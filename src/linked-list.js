const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }
    
    append(data) {
        let node = data instanceof Node ? data : new Node(data, null, null);

        if (this.length == 0) {
            this._head = node;
            this._tail = node;
        } else {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node; 
        }
        this.length++ ;
        return this;
    }

    head() { 
        return Object.values(this._head)[0];
    }

    tail() {
        return Object.values(this._tail)[0];
    }


    at(index) {
        let node = this._head;
        if (!(index >= 0 && index < this.length)) {
            return null;
        } else {
            while (index--) {
                node = node.next;
            }
            return Object.values(node)[0];  
        }  
    }

    insertAt(index, data) {
        let current = this._head;
        let counter = 1;
        let node = new Node(data);
        if (this.length == 0) {
            this._head = node;
            this._tail = node;
        }
        else if (index == 0) {
            this._head.prev = node;
            node.next = this._head;
            this._head = node;
            this.length++;
        } else {
            while (current) {
                current = current.next;
                if (counter == index) {
                    node.prev = current.prev;
                    current.prev.next = node;
                    node.next = current;
                    current.prev = node;

                }
                counter++;
            }
        }
        this.length++;
        return this;
    }

    isEmpty() {
        return this.length == 0;
    }

    clear() {
        this.length = 0;
        this._head = new Node(null, null, this._tail);
        this._tail = new Node(null, this._head, null);
        return this;
    }

    deleteAt(index) {
        let current = this._head;
        let counter = 1;
        if (index == 0) {
            this._head = this._head.next;
        } else {
            while (current) {
                current = current.next;
                if (current == this._tail) {
                    this._tail = this._tail.prev;
                    this._tail.next = null;
                } else if (counter == index) {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    break;
                }
                counter++
            }
        }
        return this;
    }

    reverse() {
        let current = this._head;
        let prev = null;
        while (current) {
            let next = current.next;
            current.next = prev;
            current.prev = next;
            prev = current;
            current = next;
        }
        this._tail = this._head;
        this._head = prev;
        return this;
    }

    indexOf(data) {
        let current = this._head;
        let counter = 0;

        while (current) {
            if (current.data == data) {
                return counter;
            } 
            current = current.next;
            counter++;
        }
        return -1;
    }
}

module.exports = LinkedList;
