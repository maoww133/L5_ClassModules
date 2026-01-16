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
            console.error('Имя пациента должно быть непустой строкой');
        }
    }
    
    set age(patientAge) {
        if (typeof patientAge === 'number' && patientAge >= 0 && patientAge <= 150) {
            this.#age = patientAge;
        } else {
            console.error('Возраст должен быть числом от 0 до 150');
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
        console.log(`Страховка: ${this.#isInsured ? 'Да' : 'Нет'}`);
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
        const cloned = new MedicalCard(
            this.patientName,
            this.age,
            this.isInsured
        );
        console.log('Создан клон медицинской карты');
        return cloned;
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
