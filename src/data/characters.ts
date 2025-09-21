import { Character } from '@/types/story.types';

export const characters: Character[] = [
  {
    id: 'elian',
    name: '伊莱恩',
    englishName: 'Elian',
    role: '男主角',
    background: '来自王国边境城镇一个普通草药商人家庭。从小跟随父亲学习辨认植物、调配药剂，养成了敏锐的观察力和冷静的头脑。家中的一本残缺古籍是他的魔法启蒙。',
    personality: '冷静理智，习惯于先观察分析再行动。不追求力量，而是渴望知识和真理。对官方宣扬的魔法教条抱有天生的怀疑。',
    appearance: '中等身材，面容清秀，眼神中透着与年龄不符的专注和冷静。常穿着朴素的亚麻外套，腰间挂着收集草药的小布袋和那本珍贵的古籍。',
        imagePrompt: 'anime+style+young+man+with+curious+eyes+holding+ancient+book+herbalist+apprentice+simple+clothes+serious+expression'
  },
  {
    id: 'sia',
    name: '希雅',
    englishName: 'Sia',
    role: '导师/引路人',
    background: '被魔法学院除名的前任女导师，罪名是研究"禁忌的自然魔法"。隐居在深林中，对墨守成规的学院派魔法嗤之鼻鼻。',
    personality: '性格古怪，说话直率，对学生要求严格但内心善良。坚信魔法应该与自然和谐共存，而非被严格控制和教条化。',
    appearance: '外表约40岁左右，头发随意束起，夹杂着几缕银丝。衣着朴素但整洁，身上常带着各种植物标本和自制的护身符。眼神锐利，似乎能看透人心。',
        imagePrompt: 'anime+style+wise+elder+woman+forest+dweller+natural+magician+with+plants+and+crystals+sharp+eyes+wild+hair'
  },
  {
    id: 'lina',
    name: '莉娜',
    englishName: 'Lina',
    role: '伊莱恩的妹妹',
    background: '伊莱恩十四岁的妹妹，活泼可爱，深受家人疼爱。三个月前突然患上神秘的"衰败病"，皮肤上出现植物纹路般的斑痕。',
    personality: '温柔善良，即使在病痛中也强装坚强，不愿让家人担心。对哥哥十分依赖和信任。',
    appearance: '娇小的身材，原本红润的脸颊因病变得苍白。金色的长发，大大的眼睛透着坚强。手臂上有淡绿色的植物纹路，但依然美丽。',
    imagePrompt: 'anime+style+young+girl+with+gentle+eyes+pale+complexion+golden+hair+plant-like+markings+on+skin+fragile+but+determined'
  },
  {
    id: 'kael',
    name: '卡尔',
    englishName: 'Kael',
    role: '同伴/古代知识学者',
    background: '神秘的年轻学者，研究古代魔法知识。在古老森林的祭坛偶遇伊莱恩，决定帮助他寻找治愈妹妹的方法。似乎对古代战争和魔法历史有深入了解。',
    personality: '睿智冷静，对古代知识充满热忱。警惕而谨慎，但内心善良愿意帮助他人。对魔法议会的做法有所不满。',
    appearance: '约二十岁的青年，棕色头发，眼神警惕而锐利。穿着简朴但实用的旅行装备，右手握着一根古朴的木杖。身上带着星光石等稀有物品。',
    imagePrompt: 'anime+style+young+scholar+with+brown+hair+alert+eyes+simple+traveling+clothes+holding+ancient+wooden+staff+mysterious+aura'
  },
  {
    id: 'valerius',
    name: '瓦莱里乌斯',
    englishName: 'Valerius',
    role: '反派/审判官',
    background: '王国魔法议会的高阶成员，负责清除所有"野生法师"和"异端魔法"。并非纯粹的恶人，而是现有秩序坚定的捍卫者。',
    personality: '智慧、强大且极具原则性。坚信不受控制的魔法曾引发过巨大的灾难，因此必须严格管控。认为伊莱恩的行为会动摇王国稳定的根基。',
    appearance: '身着华丽的蓝色与金色法师长袍，上面绣有魔法议会的纹章。面容严肃，眼神锐利如鹰。银白色长发梳理得一丝不苟，举止优雅却带着不容置疑的权威感。',
        imagePrompt: 'anime+style+magister+inquisitor+with+authoritative+presence+blue+and+gold+robes+silver+hair+serious+expression+holding+staff+with+crystal'
  }
];

export const getCharacterById = (id: string): Character | undefined => {
  return characters.find(character => character.id === id);
};