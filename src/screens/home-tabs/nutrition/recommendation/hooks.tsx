import { useState } from "react";

export type TRecommendationContent = {
  dailyNormOil: string[];
  dailyNormOilWindow: string[];
  amountOfDeficitOil: string[];
  proteinOil: string[];
  fatsOil: string[];
  buttonChangeOil: string[];
  foodConsumedPerDayOil: string[];
  dynamicsAndAnalysisOil: string[];
  dailyNormMass: string[];
  dailyNormMassWindow: string[];
  amountOfSurplusMass: string[];
  proteinMass: string[];
  fatsMass: string[];
  buttonChangeMass: string[];
  foodConsumedPerDayMass: string[];
  dynamicsAndAnalysisMass: string[];
  createProduct: string[];
};

export const RecommendationHooks = () => {
  const [state, setState] = useState("");

  const recommendationContent: TRecommendationContent = {
    dailyNormOil: [
      "Чтобы точно определить вес тела и свести погрешность к минимуму, ОБЯЗАТЕЛЬНО нужно взвешиваться на голодный желудок, после туалета, чтобы мочевой пузырь, и кишечник были пустыми",
      "Чтобы определить свою активность в течении дня вам потребуется отследить через шагомер (телефон, часы), сколько шагов вы делаете. Это обязательно нужно сделать, потому что большинству людей свойственно завышать свою активность, а шагомер покажет вам истинное положение дел…",
      "То количество калорий (суточная норма), которое выдаст  вам приложение, является ОРИЕНТИРОВОЧНОЙ.",
      "Чтобы максимально точно определить то количество калорий, которые вы расходуете в сутки исходя из вашего образа жизни, вам пришлось бы сутки провести в КАЛОРИМЕТРИЧЕСКОЙ комнате, которая нашпигована большим количеством датчиков улавливающих выделение тепла из вашего тела. Такая комната используется в НАУЧНЫХ ИССЛЕДОВАНИЯХ и является очень дорогим удовольствием.",
      "Все другие методы и формулы определяющие СУТОЧНУЮ НОРМУ калорий имеют погрешность в 200 – 400 Ккал.",
      "Здесь используется формула, которую я максимально ОПТИМИЗИРОВАЛ исходя из ФИЗИОЛОГИЧЕСКИХ ПРОЦЕССОВ, которые протекают в нашем организме. Так же в оптимизации этой формулы был учтён такой параметр как МАССА ТЕЛА БЕЗ ЖИРА (кости, внутренние органы, мышцы, кровь и т.д.).",
      "Прежде чем утвердить эту формулу, я провёл множество замеров талии, живота, бёдер, шеи своих подопечных женщин и мужчин. Отслеживал динамику процесса жиросжигания, который строился на основании тех калорий, которые определялись посредством этой формулы исходя из образа жизни человека.",
      "Так что без малейших сомнений можете полагаться на то количество калорий, которое отобразиться у вас после того, как вы введёте свой вес тела и укажите свой образ жизни.",
      "Здоровья вам и успехов в вашем процессе жиросжигания…",
    ],
    dailyNormOilWindow: [
      "Вы можете оставить выданные калории как есть или откорректировать их по своему желанию.",
      "Например: 2325 Ккал ваша суточная норма калорий. Вы можете оставить эти калории как есть или округлить в большую сторону -  2350 Ккал, или в меньшую – 2300 Ккал.",
      "Так же вы можете вписать сюда своё значение Ккал, если по каким-то причинам считаете, что приложение выдало вам не соответствующие вашему образу жизни калории.",
    ],
    amountOfDeficitOil: [
      "Если вы нацелены на комфортное избавление от жира, то рекомендую дефицит в 200 – 300 Ккал",
      "Если вы хотите ускорить утилизацию жира, то вы можете использовать дефицит в 400 – 500 Ккал",
      "Все мы хотим БЫСТРОГО ТЕМПА ЖИРОСЖИГАНИЯ и это напрямую зависит от КОЛИЧЕСТВА дефицитных калорий, и логично будет назначить себе максимальный дефицит – 500 Ккал. Но есть нюансы.",
      "Если вы ведёте МАЛОПОДВИЖНЫЙ ОБРАЗ ЖИЗНИ, у вас много жира не теле, то ваша суточная норма калорий будет не такой и большой, и, если вы назначите себе максимальный дефицит в 500 Ккал, то у вас останется мало калорий на еду, и вам придётся бороться с постоянным чувством голода. В конечном итоге вы проиграете эту борьбу, у вас будет СРЫВ и начнётся период ЗАЖОРА. За это время вы наберёте обратно всё то, что получилось скинуть на диете.",
      "Чтобы не допустить подобного развития событий, будет оптимальнее назначить себе минимальный дефицит в 100 – 200 Ккал через питание, а оставшиеся 300 - 400 Ккал организовать через ПОВЫШЕНИЕ ДВИГАТЕЛЬНОЙ АКТИВНОСТИ.  Просто начните больше ходить пешком, выходите на прогулки и т.д.",
      "Результаты научных исследований показывают, что ПОВЫШЕННАЯ АКТИВНОСТЬ (8 -10 тыс. шагов в день), снижает аппетит, а малоподвижный образ жизни наоборот, повышает аппетит.",
      "После того, как вы регулярно будете нашагивать 8-10 тыс. шагов в день, то вы можете пересчитать ваши калории СУТОЧНОЙ НОРМЫ, указав свой новый вес тела и новый образ жизни. И получив новую калорийность (она будет выше первоначальной), вы можете назначить себе новое количество дефицита 300 – 500 Ккал.",
      "Наше телосложение, самочувствие и здоровье в будущем, будут зависеть от наших привычек и образа жизни.",
      "Повышенная двигательная активность (10 – 12 тыс. шагов в день), является одной из полезных привычек, которая внесёт существенный вклад в процесс преображения вашего тела и поможет удержать наработанный результат.",
    ],
    proteinOil: [
      "Оптимальное количество белка будет зависеть от количества дефицита назначенного вами и вашего образа жизни.",
      "Если вы назначили себе дефицит 200 – 300 Ккал, и вы не занимаетесь физическими нагрузками (фитнес, кросфит и т.д.), то рекомендую назначить норму белка в 20 %. Если занимаетесь физическими нагрузками, то рекомендую увеличить количество белка до 30 %.",
      "Если в целях увеличения темпов жиросжигания вы назначили себе дефицит в 400 – 500 Ккал, и вы не занимаетесь физическими нагрузками, то норма белка должна быть не меньше 30%. Если занимаетесь физическими нагрузками, то можно увеличить количество белка до 35% - 40%.",
      "Белок является самым важным элементом нашего питания, потому что большинство структур нашего организма (кожа, внутренние органы, мышцы, пептидные гормоны, иммунные клетки…), являются белковыми структурами, а наш организм не может запасать белок, как он это делает с жиром и углеводами.",
      'Так же в нашем организме постоянно протекает процесс распада клеток и их обновления.  Белок, точнее его производные (аминокислоты), являются "строительным материалом" в процессе обновления клеток.',
      "Если белка будет поступать меньше, чем требуется вашему организму, то уровень РАСПАДА клеток будет превышать уровень ОБНОВЛЕНИЯ клеток и это приведёт к разным проблемам, которые будут возникать в вашем организме на фоне недостаточности белка.",
    ],
    fatsOil: [
      "Количество жиров в вашем рационе не должно быть ниже 20%.",
      "Если вы назначили себе дефицит в 400 – 500 Ккал, то увеличьте количество жиров до 25% - 30%.",
      "Жиры по своей значимости для нашего организма стоят на 2-м месте после БЕЛКА",
      "Очень важно контролировать их количество и не опускаться ниже минимального значения в 20%.",
    ],
    buttonChangeOil: [
      "Чтобы сохранять оптимальный темп жиросжигания необходимо периодически корректировать (уменьшать) дефицитную норму калорий. Если этого не делать, то со временем вы перестанете сжигать жир, потому что изначальная дефицитная норма калорий превратится в калорийность поддержания того веса тела на котором вы остановились.",
      "Поэтому, каждые 10 – 15 дней обновляйте свои показатели веса тела и замеры частей тела (шея, талия, живот и т.д.), чем больше замеров сделаете, тем лучше вы сможете анализировать ваш процесс жиросжигания.",
      "Если после очередного обновления показателей выявится, что динамика жиросжигания не удовлетворяет вас, то нужно произвести корректировку (уменьшение) дефицитной нормы калорий.",
      "Следует уменьшить дефицитную норму калорий на 10%.",
      "После корректировки вы получите новое значение дефицитной нормы и продолжите вашу диету основываясь на это значение.",
    ],
    foodConsumedPerDayOil: [
      "Главное правило жиросжигания – это дефицит поступающей энергии через пищу",
      "Поэтому, при планировании своего рациона ориентируйтесь на то, чтобы ваши фактические калории не превышали дефицитную норму калорий.",
      "Всегда планируйте своё питание так, чтобы набирать свою норму белка, которую вы задали при назначении своей дефицитной нормы калорий.",
      "Если при планировании дневного рациона фактическое количество белка получится больше вашей нормы, то в этом случае вы можете оставить всё как есть или же откорректировать количество белка, манипулируя количеством ингредиентов и их весом. Всегда держите в уме, что БЕЛОК самый важный компонент нашего питания, и чем больше его в вашем рационе в период жиросжигания, тем лучше для вас, так как повышенное количество белка даёт хорошую сытость, а это очень важный фактор на диете. Так же у белка самый большой ТЕРМИЧЕСКИЙ ЭФФЕКТ ПИЩИ, который внесёт дополнительный вклад в количество дефицита и поможет ускорить темпы жиросжигания.",
      "Количество жиров в вашем рационе так же следует контролировать и не опускаться ниже тех значений, которые вы задали, когда назначали дефицитную норму калорий.",
      "Если при планировании дневного рациона фактическое количество жиров получится больше, чем ваша норма и при этом, вы не вышли за границу вашей дефицитной нормы калорий, то можете оставить всё как есть или, откорректировать количество жиров до своей нормы либо близко к ней.",
      "Что касается углеводов, то они высчитываются сами по остаточному принципу, так как не имеют такой значимости, как белки и жиры.",
      "Для вас самое главное правило – НЕ ВЫЙТИ за границу дефицитной нормы калорий.  Планируйте своё питание так, чтобы набирать то количество белков и жиров, которые вы назначили.  Больше назначенного количества можно, но меньше нельзя.",
    ],
    dynamicsAndAnalysisOil: [
      "Чтобы жиросжигательный процесс двигался с оптимальной скоростью, нужно регулярно отслеживать динамику и анализировать её.",
      "Чем больше параметров вашего тела вы будете отслеживать, тем точнее можно будет делать анализ и принимать дальнейшие решения.",
      "Например: Вы измерили вес тела, окружность талии, живота, но не сделали замеров шеи, бёдер, рук и груди.",
      "Прошло 15 дней с того дня, как вы начали диетить и пришло время обновить замеры. Вы обновляете замеры и обнаруживается, что вес упал на 1-2 кг, но талия и живот не уменьшились. И обычно в таких случаях человек не понимает, почему так произошло. А причина в том, что жир ушёл со спины, с рук, с шеи и т.д. Если бы вы сделали замеры этих частей тела, то у вас бы не возник вопрос почему вес упал, а талия и живот не уменьшились.",
      "Поэтому, чем больше частей вашего тела вы замерите и будете отслеживать их динамику, тем качественнее будут ваши последующие решения относительно темпов жиросжигания или корректировки дефицитной нормы калорий.",
      "Так же настоятельно рекомендую делать фотографии в полный рост, в минимальном количестве одежды (в нижнем белье), при хорошем освещении. Фотографироваться нужно 1 раз в месяц и делать коллаж с предыдущими фотками. Так вы будете видеть, как меняется ваше тело, где оно меняется и т.д.",
      "Всегда помните, что жир никогда не уходит с одинаковой скоростью. На старте, когда его много на вашем теле, темп утилизации жира будет повышенным, если конечно вы всё делаете правильно. Чем меньше жира остаётся на вашем теле, тем с меньшей скоростью он будет уходить.",
      "И именно поэтому нужно регулярно отслеживать динамику ваших замеров, чтобы своевременно вносить нужные корректировки (количество калорий, активность), и поддерживать оптимальную скорость жиросжигания.",
    ],
    dailyNormMass: [
      "Чтобы точно определить вес тела и свести погрешность к минимуму, ОБЯЗАТЕЛЬНО нужно взвешиваться на голодный желудок, после туалета, чтобы мочевой пузырь, и кишечник были пустыми.",
      "Чтобы определить свою активность в течении дня вам потребуется отследить через шагомер (телефон, часы), сколько шагов вы делаете. Это обязательно нужно сделать, потому что большинству людей свойственно завышать свою активность, а шагомер покажет вам истинное положение дел…",
      "То количество калорий (суточная норма), которое выдаст  вам приложение, является ОРИЕНТИРОВОЧНОЙ.",
      "Чтобы максимально точно определить то количество калорий, которые вы расходуете в сутки исходя из вашего образа жизни, вам пришлось бы сутки провести в КАЛОРИМЕТРИЧЕСКОЙ комнате, которая нашпигована большим количеством датчиков улавливающих выделение тепла из вашего тела. Такая комната используется в НАУЧНЫХ ИССЛЕДОВАНИЯХ и является очень дорогим удовольствием.",
      "Все другие методы и формулы определяющие СУТОЧНУЮ НОРМУ калорий имеют погрешность в 200 – 400 Ккал.",
      "Здесь используется формула, которую я максимально ОПТИМИЗИРОВАЛ исходя из ФИЗИОЛОГИЧЕСКИХ ПРОЦЕССОВ, которые протекают в нашем организме. Так же в оптимизации этой формулы был учтён такой параметр как МАССА ТЕЛА БЕЗ ЖИРА (кости, внутренние органы, мышцы, кровь и т.д.).",
      "Так как ваша цель набор мышечной массы, вы должны будете питаться с профицитом калорий, так же каждые 10-15 дней будете корректировать свою суточную норму калорий. Вы в любом случае определите вашу оптимальную суточную калорийность, которая позволит вам эффективно наращивать мышечную массу и не набирать подкожный жир большими темпами, как это бывает у большинства тренирующихся.",
      "Так что без малейших сомнений можете полагаться на то количество калорий, которое отобразиться у вас после того, как вы введёте свой вес тела и укажите свой образ жизни.",
      "Здоровья вам и успехов в вашем процессе набора мышечной массы…",
    ],
    dailyNormMassWindow: [
      "Вы можете оставить выданные калории как есть или откорректировать их по своему желанию.",
      "Например: 2520 Ккал ваша суточная норма калорий. Вы можете оставить эти калории как есть или округлить в большую сторону -  2550 Ккал, или в меньшую – 2500 Ккал.",
      "Так же вы можете вписать сюда своё значение Ккал, если по каким-то причинам считаете, что приложение выдало вам не соответствующие вашему образу жизни калории.",
    ],
    amountOfSurplusMass: [
      "Если вы ведёте активный образ жизни (10 тыс. шагов в день и более), тренируетесь в зале, то для вас рекомендованное количество профицита 500 Ккал.",
      "Если вы вёдете малоподвижный образ жизни (3-6 тыс. шагов в день), тренируетесь в зале, то для вас рекомендованное количество профицита 300 Ккал",
      "Мышцы растут крайне медленно и чтобы набранные вами килограммы не приходились в основном на подкожный жир, количество профицитных калорий не должно быть слишком большим.",
      "Известный американский спортивный физиолог и диетолог Лайл Макдональд указывает следующие цифры в потенциале мышечного роста: новичок за первый год тренировок может нарастить 10-13 кг  мышц.",
      "На второй год потенциал мышечного роста падает до 5-6 кг в год, на третий год 2-3 кг, а на четвёртый год 1-1,5 кг. ",
      "Как видите, чем больше тренировочный стаж, тем меньше мышц мы можем нарастить в разрезе года.",
      "Возьмём в качестве примера новичка и посчитаем, какое количество профицитных калорий ему потребуется, чтобы нарастить 1 кг мышц в месяц, из расчёта, что в год он может нарастить 12 кг мышц.",
      "Тот же Лайл Макдональд приводит данные, что для синтеза 1 кг мышц требуется от 5000 до 7000 Ккал.",
      "Возьмём максимальное значение в 7000 Ккал",
      "7000 Ккал ÷ 30 дней = 235 Ккал в день",
      "И так мы видим, чтобы нарастить 1 кг мышц в месяц, новичку нужно создать профицит в 235 Ккал.",
      "Но у многих возникнет мысль, если создать профицит в 2 раза больше (470 Ккал), то и мышцы вырастут в 2 раза больше, т.е. 2 кг в месяц. Но это не так.",
      "Так как мышцы растут очень медленно, то эти дополнительные профицитные калории с большей вероятностью пойдут в подкожный жир. Да, на весах вы увидите прибавку в 2 или более килограмм, но мышц в этих килограммах будет 50% или даже меньше.",
      "Для вас вес тела должен быть инструментом отслеживания динамики процесса, а не самой целью.",
      'Зачем набирать "грязно"? В этом случае вам придется избавляется от жира, который отложится  внизу живота и боках… ',
      "Наберитесь терпения, регулярно тренируйтесь и всегда помните, что КАЧЕСТВО набранных килограмм важнее количества…",
      "Теперь вы имеете представление, какое количество профицитных калорий себе назначить.",
    ],
    proteinMass: [
      "Рост мышц – это энергозатратный процесс.",
      "Оптимальным источником энергии для нашего организма является глюкоза, а она содержится в углеводах.",
      "Поэтому, при наборе мышечной массы нет необходимости есть много белка, как это обычно делается при жиросжигании на дефиците калорий.",
      "20 % - 25% белка от профицитной нормы калорий будет достаточно, чтобы обеспечить аминокислотами, как обновление клеток белковых структур организма, так и рост новых мышечных клеток.",
    ],
    fatsMass: [
      "При профиците калорий крайне важно следить за количеством жиров, чтобы не набирать избыточный жир на теле.",
      "В отличии от белков и углеводов, жиры усваиваются на 98% и первым делом направляются в жировые клетки, и только потом, если есть необходимость, используются нашим организмом.",
      "Так как глюкоза является оптимальным источником энергии для наших мышц, грамотный профицит всегда создаётся за счёт увеличения углеводов, а повышенное количество углеводов тормозит окисление жиров.",
      "Поэтому, крайне важно контролировать количество жиров и не превышать рекомендованное количество в 15% - 20% от профицитной нормы калорий.",
    ],
    buttonChangeMass: [
      "Если после прохождения 15 дней на профицитной калорийности ваш вес тела не увеличился на 0,5 кг – 1 кг, то вам следует увеличить профицитную норму калорий на 5% - 10%.",
      "Если вы ведёте активный образ жизни (10 тыс. шагов в день и более), тренируетесь в зале, то увеличьте профицитную норму калорий на 10%.",
      "Если вы вёдете малоподвижный образ жизни (3-6 тыс. шагов в день), тренируетесь в зале, то увеличьте профицитную норму калорий на 5%.",
      "После корректировки вы получите новое значение профицитной нормы и продолжите питаться основываясь на это значение.  ",
      "Помните, мышцы растут очень медленно и чтобы желанная прибавка в весе тела не приходилась на подкожный жир, следует понемногу (5%-10%) увеличивать профицитную калорийность.",
      "Качество набранных килограмм важнее количества.",
    ],
    foodConsumedPerDayMass: [
      "При  планировании своего рациона ориентируйтесь на то, чтобы ваши фактические калории, количество Белков, Жиров, Углеводов были равными ПРОФИЦИТНОЙ НОРМЕ.",
      "Если при планировании дневного рациона фактическое количество белка получится больше вашей нормы, то в этом случае вы можете оставить всё как есть или же откорректировать количество белка, манипулируя количеством ингредиентов и их весом.",
      "Количество жиров в вашем рационе так же следует контролировать и не превышать тех значений, которые вы задали, когда назначали профицитную норму калорий. ",
      "В период набора мышечной массы, по значимости после Белка стоят Углеводы.",
      "Поэтому, если при планировании рациона количество Углеводов получится больше запланированной нормы, а количество Жиров меньше, и вы не превысите ПРОФИЦИТНУЮ НОРМУ калорий, то можете оставить всё как есть.",
    ],
    dynamicsAndAnalysisMass: [
      "Чтобы процесс набора мышечной массы двигался с оптимальной скоростью, нужно регулярно отслеживать динамику и анализировать её.",
      "Каждые 15 дней обновляйте свои показатели веса тела. Взвешиваться следует утром, на голодный желудок, после туалета.",
      "Если по истечении 15 дней вес не изменился, то нужно увеличить калорийность ПРОФИЦИТНОЙ НОРМЫ на 5%-10%.",
      "Так же каждые 15 дней следует вести учёт окружности талии и живота, чтобы понимать, за счёт чего идёт прибавка в весе. ",
      "Если окружность живота увеличивается на 0,7 – 1 см вместе с весом тела, то это показатель того, что часть набранного веса пришлась на подкожный жир и нужно уменьшать калорийность ПРОФИЦИТНОЙ НОРМЫ на 5% или увеличить двигательную активность",
      "Так же рекомендуется делать замеры шеи, рук, груди, ног, бёдер, икр.",
      "Обновлять замеры этих частей тела нужно не чаще одного раза в месяц для новичков и один раз в два месяца для опытных.",
      "Настоятельно рекомендую делать фотографии в полный рост, в минимальном количестве одежды (в нижнем белье), при хорошем освещении. Фотографироваться нужно один раз в месяц и делать коллаж с предыдущими фотками. Так вы будете видеть, как меняется ваше тело, где оно меняется и т.д.",
      "ИНФОРМАЦИЯ для НОВИЧКОВ.",
      "Результаты научного исследования за 2017 год проведённое Fеlipе Damas и коллегами показали, что рост мышц начинается с четвёртой недели тренировок.",
      "То набухание мышц, которое вы чувствуете после первых недель тренировок, является ОТЁКОМ (задержка воды), который возникает на фоне микротравматики мышц после тренировок и не имеет ничего общего с истинным ростом мышечных волокон.",
    ],
    createProduct: [
      "Добавляя свой продукт, вы создаёте свою персональную базу продуктов.",
      "Задача этой функции в том, чтобы увеличить скорость похудения и жиросжигания.",
      "ПРИМЕР:",
      "Допустим, вы планируете включить в свой суточный план питания шоколад или любой другой продукт. На обратной стороне обёртки продукта, производитель указал, что в 100 гр. продукта содержится Белков - 10 гр, Жиров - 30 гр, Углеводов - 50 гр, и 510 Ккал.",
      "Чтобы ваш процесс похудения был эффективным, а темпы жиросжигания ускорились, вы делаете следующее:",
      "Уменьшаете количество Белков на 20%",
      "Увеличиваете количество  Жиров на 10%",
      "Увеличиваете количество Углеводов на 30%",
      "После расчётов мы получаем:",
      "Белков - 8 гр",
      "Жиров - 33 гр",
      "Углеводов - 65 гр",
      "Калорий - 589 Ккал",
      "В результате получается разница в 79 Ккал.",
      "Это эквивалент 10 граммам человеческого жира или 1600 шагам.",
      "Вы просто откорректировали БЖУ продукта и получили дополнительный дефицит в 79 Ккал, который ускорит темпы похудения и жиросжигания.",
      "По факту из 100 гр. шоколада в вас поступило 510 Ккал, но в вашем дневнике питания отражается 589 Ккал.",
      "Действуя таким образом, вы сводите к нулю риск ошибки подсчёта суточной калорийности и получаете профит в скорости утилизации лишнего жира на теле.",
      "Вам может показаться, что корректировка БЖУ продуктов немного муторное дело, но как вы видели в примере выше, это принесёт большую выгоду в жиросжигании...",
      "Один раз потратите немного времени, а эффект будете получать постоянно, тем более, перечень продуктов, которые регулярно употребляет современный человек не так уж и велик.",
    ],
  };

  return { recommendationContent };
};
