import { MedicalCard } from './MedicalCard.js';

export class ChildMedicalCard extends MedicalCard {
    #vaccinationStatus;
    
    constructor(patientName = "", age = 0, isInsured = false, vaccinationStatus = "Не вакцинирован") {
        super(patientName, age, isInsured);
        this.#vaccinationStatus = vaccinationStatus;
    }

    get vaccinationStatus() {
        return this.#vaccinationStatus;
    }
    
    set vaccinationStatus(status) {
        const validStatuses = ["Полностью вакцинирован", "Частично вакцинирован", "Не вакцинирован"];
        if (validStatuses.includes(status)) {
            this.#vaccinationStatus = status;
        } else {
            console.error('Неверный статус вакцинации');
        }
    }
    
    show() {
        console.log('Детская медицинская карта:');
        console.log(`Пациент: ${this.patientName}`);
        console.log(`Возраст: ${this.age}`);
        console.log(`Страховка: ${this.isInsured ? 'Да' : 'Нет'}`);
        console.log(`Статус вакцинации: ${this.#vaccinationStatus}`);
    }

    delete() {
        console.log(`Детская карта пациента ${this.patientName} удалена из архива`);
        super.delete();
    }
    
    copy() {
        const copy = super.copy();
        console.log('Создана ссылка на детскую медицинскую карту');
        return copy;
    }
    
    static clone(original) {
        if (!(original instanceof ChildMedicalCard)) {
            throw new Error('Можно клонировать только объекты ChildMedicalCard');
        }
        return new ChildMedicalCard(
            original.patientName,
            original.age,
            original.isInsured,
            original.vaccinationStatus
        );
    }
    
    getVaccinationRecommendation() {
        if (this.age < 1) return "Рекомендуется начать вакцинацию";
        if (this.age < 6) return "Продолжить по графику вакцинации";
        return "Пройти школьную вакцинацию";
    }
}