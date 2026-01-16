export class MedicalCard {
    #patientName;
    #age;
    #isInsured;
    
    constructor(patientName = "", age = 0, isInsured = false) {
        this.#patientName = patientName;
        this.#age = age;
        this.#isInsured = isInsured;
    }
    
    get patientName() {
        return this.#patientName;
    }
    
    get age() {
        return this.#age;
    }
    
    get isInsured() {
        return this.#isInsured;
    }
    
    set patientName(name) {
        if (typeof name === 'string' && name.length > 0) {
            this.#patientName = name;
        } else {
            console.error('Напишите имя пациента');
        }
    }
    
    set age(patientAge) {
        if (typeof patientAge === 'number' && patientAge >= 0 && patientAge <= 90) {
            this.#age = patientAge;
        } else {
            console.error('Возраст должен быть от 0 до 90');
        }
    }
    
    set isInsured(insured) {
        if (typeof insured === 'boolean') {
            this.#isInsured = insured;
        } else {
            console.error('Статус страховки должен быть boolean');
        }
    }

    show() {
        console.log('Медицинская карта:');
        console.log(`Пациент: ${this.#patientName}`);
        console.log(`Возраст: ${this.#age}`);
        console.log(`Страховка: ${this.#isInsured ? 'ЕСть' : 'Нет'}`);
    }
    
    delete() {
        Object.keys(this).forEach(key => {
            delete this[key];
        });
        console.log('Медицинская карта удалена');
    }
    
    copy() {
        return this;
    }
    
    clone() {
        const cloned = MedicalCard.#deepClone(this);
        console.log('Создан клон медицинской карты');
        return cloned;
    }
    
    static #deepClone(obj, hash = new WeakMap()) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (hash.has(obj)) {
            return hash.get(obj);
        }
        
        if (obj instanceof Date) {
            return new Date(obj);
        }
        
        if (obj instanceof RegExp) {
            return new RegExp(obj);
        }
        
        if (obj instanceof Map) {
            const copy = new Map();
            hash.set(obj, copy);
            obj.forEach((value, key) => {
                copy.set(key, MedicalCard.#deepClone(value, hash));
            });
            return copy;
        }
        
        if (obj instanceof Set) {
            const copy = new Set();
            hash.set(obj, copy);
            obj.forEach(value => {
                copy.add(MedicalCard.#deepClone(value, hash));
            });
            return copy;
        }
        
        const proto = Object.getPrototypeOf(obj);
        
        if (proto && proto.constructor) {
            const clone = Object.create(proto);
            hash.set(obj, clone);
            
            const allKeys = [
                ...Object.getOwnPropertyNames(obj),
                ...Object.getOwnPropertySymbols(obj)
            ];
            
            for (const key of allKeys) {
                if (key.startsWith('#')) {
                    continue;
                }
                
                const descriptor = Object.getOwnPropertyDescriptor(obj, key);
                
                if (descriptor) {
                    if (typeof descriptor.value === 'object' && descriptor.value !== null) {
                        Object.defineProperty(clone, key, {
                            ...descriptor,
                            value: MedicalCard.#deepClone(descriptor.value, hash)
                        });
                    } else {
                        Object.defineProperty(clone, key, descriptor);
                    }
                }
            }
            
            return clone;
        }
        
        return obj;
    }
    
    #calculateHealthRisk() {
        if (this.#age < 18) {
            return 'Низкий';
        }
        
        if (this.#age < 45) {
            return 'Средний';
        }
        
        if (this.#age < 65) {
            return 'Высокий';
        }
        
        return 'Очень высокий';
    }
    
    getHealthRisk() {
        return this.#calculateHealthRisk();
    }
    
    static clone(original) {
        if (!(original instanceof MedicalCard)) {
            throw new Error('Можно клонировать только объекты MedicalCard');
        }
        
        return original.clone();
    }
}
