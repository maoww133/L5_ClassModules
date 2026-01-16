import { ChildMedicalCard } from './ChildMedicalCard.js';

const medicalCards = [
    new ChildMedicalCard("Иван Иванов", 5, true, "Частично вакцинирован"),
    new ChildMedicalCard("Анастасия Петровна", 8, false, "Полностью вакцинирован")
];

console.log('Демонстрация медицинских карт:');
medicalCards.forEach((card, index) => {
    console.log(`\nКарта ${index + 1}:`);
    card.show();
});

console.log('\nДополнительная информация:');
medicalCards.forEach((card, index) => {
    console.log(`\nПациент ${index + 1} (${card.patientName}):`);
    console.log(`Рекомендация по вакцинации: ${card.getVaccinationRecommendation()}`);
});

console.log('\nРабота с геттерами/сеттерами:');
const testCard = new ChildMedicalCard("Тестовый пациент", 3, true, "Не вакцинирован");
console.log('Изначальное имя:', testCard.patientName);
testCard.patientName = "Новое имя";
console.log('Измененное имя:', testCard.patientName);

console.log('\nДемонстрация клонирования:');
const original = medicalCards[0];
const clone = ChildMedicalCard.clone(original);
console.log('Оригинал и клон - один объект?', original === clone);
clone.show();
