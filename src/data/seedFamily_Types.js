const db = require('../models');
const familles = [

  { nomFrancais: 'Courroie Caoutchouc', 
    nomAnglais: 'Rubber Belt' , 
    descriptionFrancais: 'Ce sont les courroies les plus utilisées pour la transmission de puissance. À tension égale, elles transmettent une puissance plus élevée que les courroies plates. Elles sont utilisées, par exemple, dans les variateurs de vitesse. Elles offrent les meilleures combinaisons de traction, vitesse, charge des roulements et durée de vie. Avantages : La section en V de la courroie suit une rainure dans la poulie, ce qui fait que la courroie ne peut pas glisser', 
    descriptionAnglais: 'These are the most commonly used belts for power transmission. At equal tension, they transmit higher power than flat belts. They are used, for example, in variable speed drives. They offer the best combinations of traction, speed, bearing load, and service life. Advantages: The V-section of the belt follows a groove in the pulley, which prevents the belt from slipping.'
   },

    { nomFrancais: 'Courroie Polyuréthane', 
    nomAnglais: 'Polyurethane Belt', 
    descriptionFrancais: 'Courroies fabriquées en polyuréthane avec des câbles en acier ou en kevlar pour la transmission de puissance. Elles offrent une résistance supérieure à l\'usure, aux produits chimiques et aux températures extrêmes par rapport aux courroies en caoutchouc traditionnelles. Utilisées dans les industries alimentaires, pharmaceutiques et manufacturières où la durabilité et la performance sont essentielles.', 
    descriptionAnglais: 'Belts made of polyurethane with steel or kevlar cords for power transmission. They offer superior resistance to wear, chemicals, and extreme temperatures compared to traditional rubber belts. Used in food, pharmaceutical, and manufacturing industries where durability and performance are essential.'
   },
   
    { nomFrancais: 'Courroie Spéciale', 
    nomAnglais: 'Specialty Belt', 
    descriptionFrancais: 'Courroies conçues pour des applications spécifiques nécessitant des caractéristiques particulières telles que la résistance à la chaleur, la flexibilité extrême ou la capacité de fonctionner dans des environnements difficiles. Elles sont souvent utilisées dans des machines spéciales, des équipements industriels lourds et des applications nécessitant une performance fiable sous des conditions extrêmes.', 
    descriptionAnglais: 'Belts designed for specific applications requiring particular characteristics such as heat resistance, extreme flexibility, or the ability to operate in harsh environments. They are often used in special machinery, heavy industrial equipment, and applications requiring reliable performance under extreme conditions.'
   },
    
];

const types = [
  { nomFrancais: 'Courroies trapézoïdales multiples',
    nomAnglais: 'Combine V-Belts' ,
    descriptionFrancais: 'Les courroies trapézoïdales multiples, également appelées courroies poly-V, sont constituées de plusieurs nervures longitudinales qui offrent une surface de contact plus grande avec les poulies. Cela permet une transmission de puissance plus efficace et une meilleure dissipation de la chaleur. Elles sont couramment utilisées dans les applications automobiles et industrielles où l\'espace est limité mais où une performance élevée est requise.',
    descriptionAnglais: 'Multi V-belts, also known as poly-V belts, consist of multiple longitudinal ribs that provide a larger contact surface with the pulleys. This allows for more efficient power transmission and better heat dissipation. They are commonly used in automotive and industrial applications where space is limited but high performance is required.' ,
    usageFrancais: ' applications lourdes où une seule courroie ne suffit pas (gros compresseurs, presses, etc.)', 
    usageAnglais: 'heavy-duty applications where a single belt is insufficient (large compressors, presses, etc.)' ,
    materieuxFrancais: 'Caoutchouc (CR) avec cordons polyester',
    materieuxAnglais: 'Chloroprene rubber (CR) with polyester tensile cords',
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroies trapézoïdales étroites',
    nomAnglais: 'Narrow V Belts' , 
    descriptionFrancais: 'Les courroies trapézoïdales étroites, également appelées courroies en V étroites, sont conçues pour des applications nécessitant une transmission de puissance efficace dans des espaces restreints. Leur profil en V permet une meilleure adhérence sur les poulies, réduisant ainsi le glissement et augmentant l\'efficacité énergétique. Elles sont couramment utilisées dans les équipements industriels, les machines agricoles et les systèmes de convoyage où l\'espace est limité mais où une performance élevée est requise.', 
    descriptionAnglais: 'Narrow trapezoidal belts, also known as narrow V-belts, are designed for applications requiring efficient power transmission in confined spaces. Their V-profile allows for better grip on pulleys, thereby reducing slippage and increasing energy efficiency. They are commonly used in industrial equipment, agricultural machinery, and conveyor systems where space is limited but high performance is required.' , 
    usageFrancais: 'applications à haute vitesse et forte puissance (machines-outils, ventilateurs industriels, etc.)', 
    usageAnglais: 'high-speed, high-power applications (machine tools, industrial fans, etc.)' ,
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords', 
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroies variables', 
    nomAnglais: 'Variable Speed Belts' , 
    descriptionFrancais: 'Section en V variable, utilisée dans les transmissions à variation continue (CVT).', 
    descriptionAnglais: 'Variable V-section, used in continuously variable transmissions (CVT).', 
    usageFrancais: 'scooters, tondeuses, machines agricoles à vitesse variable.', 
    usageAnglais: 'scooters, lawn mowers, variable-speed agricultural machinery.',
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroies trapézoïdales classiques', 
    nomAnglais: 'Classic V Belts' , 
    descriptionFrancais: 'Courroies en V standard utilisées dans une variété d\'applications industrielles pour la transmission de puissance entre arbres.', 
    descriptionAnglais: 'Standard V-belts used in a variety of industrial applications for power transmission between shafts.', 
    usageFrancais: 'machines industrielles générales, compresseurs, pompes, etc.', 
    usageAnglais: 'general industrial machinery, compressors, pumps, etc.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords', 
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie trapézoïdale hexagonale', 
    nomAnglais: 'Hexangular V Belts', 
    descriptionFrancais: 'Profil en double trapèze (forme de “∧∨”), permettant la transmission dans les deux sens.', 
    descriptionAnglais: 'Double trapezoid profile (shape of “∧∨”), allowing transmission in both directions.', 
    usageFrancais: 'applications nécessitant une inversion fréquente du sens de rotation.', 
    usageAnglais: 'applications requiring frequent reversal of rotation direction.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords',  
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroies trapézoïdales étroites crantées', 
    nomAnglais: 'Cogged Narrow V Belts', 
    descriptionFrancais:'Elle garantit une rigidité transversale maximale avec une excellente flexibilité dans le sens de la marche et transmet d\'avantage de puissance que les courroies conventionnelles.', 
    descriptionAnglais: 'It ensures maximum lateral stiffness with excellent flexibility in the direction of travel and transmits more power than conventional belts.', 
    usageFrancais: 'l\'automobile (alternateur, climatisation) et les machines industrielles et agricoles (compresseurs, ventilateurs, broyeurs, tondeuses)', 
    usageAnglais: 'automotive (alternator, air conditioning) and industrial and agricultural machinery (compressors, fans, grinders, mowers)', 
    materieuxFrancais: 'Caoutchouc EPDM avec cordons en Kevlar (aramide)',
    materieuxAnglais: 'EPDM rubber with aramid (Kevlar) tensile cords', 
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroies Synchrone', 
    nomAnglais: 'Synchronous Belts', 
    descriptionFrancais:'Les courroies synchrones sont dentées. Elles sont par exemple utilisées pour entraîner les arbres à cames ou pour la transmission secondaire de certaines motocyclettes. Elles sont aussi utilisées sur de nombreuses machines industrielles ou agricoles. La courroie synchrone est essentielle pour éviter tout déphasage. Une courroie non crantée se décalera toujours du fait de son élasticité, même si elle est bien tendue', 
    descriptionAnglais: 'Synchronous belts are toothed. They are used, for example, to drive camshafts or for the secondary transmission of certain motorcycles. They are also used on many industrial or agricultural machines. The synchronous belt is essential to avoid any phase shift. A non-toothed belt will always shift due to its elasticity, even if it is well tensioned.', 
    usageFrancais: 'machines industrielles, motocyclettes, équipements agricoles.', 
    usageAnglais: 'industrial machines, motorcycles, agricultural equipment.',
    materieuxFrancais:'Caoutchouc néoprène (CR) avec cordons en fibre de verre',
    materieuxAnglais:'Chloroprene rubber (CR) with fiberglass tensile cords', 
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroies Poly-V', 
    nomAnglais: 'Poly-V Belts', 
    descriptionFrancais:'Les courroies Poly-V, également appelées courroies trapézoïdales multiples, sont constituées de plusieurs nervures longitudinales qui offrent une surface de contact plus grande avec les poulies. Cela permet une transmission de puissance plus efficace et une meilleure dissipation de la chaleur. Elles sont couramment utilisées dans les applications automobiles et industrielles où l\'espace est limité mais où une performance élevée est requise.', 
    descriptionAnglais: 'Poly-V belts, also known as multi-ribbed belts, consist of multiple longitudinal ribs that provide a larger contact surface with the pulleys. This allows for more efficient power transmission and better heat dissipation. They are commonly used in automotive and industrial applications where space is limited but high performance is required.', 
    usageFrancais: 'équipements automobiles, machines industrielles, systèmes de convoyage.', 
    usageAnglais: 'automotive equipment, industrial machines, conveyor systems.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords', 
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroies HTD & STD & RPP', 
    nomAnglais:'HTD & STD & RPP Belts', 
    descriptionFrancais:'Les courroies HTD (High Torque Drive), STD (Super Torque Drive) et RPP (Round Profile Polyurethane) sont des types de courroies synchrones conçues pour des applications spécifiques nécessitant une transmission de puissance élevée et une précision de synchronisation. Les courroies HTD et STD sont caractérisées par leurs profils dentés qui permettent une meilleure adhérence et une capacité de charge accrue, tandis que les courroies RPP offrent une flexibilité et une résistance chimique supérieures grâce à leur profil rond en polyuréthane.', 
    descriptionAnglais:'HTD (High Torque Drive), STD (Super Torque Drive), and RPP (Round Profile Polyurethane) belts are types of synchronous belts designed for specific applications requiring high power transmission and synchronization precision. HTD and STD belts are characterized by their toothed profiles that allow for better grip and increased load capacity, while RPP belts offer superior flexibility and chemical resistance due to their round polyurethane profile.', 
    usageFrancais:'applications industrielles lourdes, machines de précision, équipements exposés à des environnements chimiques.', 
    usageAnglais:'heavy industrial applications, precision machinery, equipment exposed to chemical environments.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords',  
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie trapézoïdale légère', 
    nomAnglais: 'Light Duty V Belt',
    descriptionFrancais: 'Courroie légère adaptée aux applications à faible charge.',
    descriptionAnglais: 'Light belt suitable for low load applications.',
    usageFrancais: 'Applications légères dans l\'industrie.',
    usageAnglais: 'Light industrial applications.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords', 
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie trapézoïdale biseautée', 
    nomAnglais: 'Bended V Belt',
    descriptionFrancais: 'Courroie trapézoïdale courbée conçue pour des configurations spécifiques de poulies.',
    descriptionAnglais: 'Bent trapezoidal belt designed for specific pulley configurations.',
    usageFrancais: 'Applications avec chemins de transmission courbes.',
    usageAnglais: 'Applications with curved transmission paths.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords', 
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie trapézoïdale étroite bandée', 
    nomAnglais: 'Banded Narrow V Belt',
    descriptionFrancais: 'Courroie étroite renforcée par une bande textile pour une meilleure résistance.',
    descriptionAnglais: 'Narrow belt reinforced with textile band for better strength.',
    usageFrancais: 'Applications nécessitant une haute durabilité.',
    usageAnglais: 'Applications requiring high durability.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords',
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie variable agricole', 
    nomAnglais: 'Agricultural Variable Speed Belt',
    descriptionFrancais: 'Courroie à vitesse variable utilisée dans les équipements agricoles.',
    descriptionAnglais: 'Variable speed belt used in agricultural equipment.',
    usageFrancais: 'Machines agricoles à vitesse variable.',
    usageAnglais: 'Variable speed agricultural machinery.',
    materieuxFrancais: 'Caoutchouc EPDM avec cordons en Kevlar (aramide)',
    materieuxAnglais: 'EPDM rubber with aramid (Kevlar) tensile cords',
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie trapézoïdale marché du riz', 
    nomAnglais: 'Rice Market V Belt',
    descriptionFrancais: 'Courroie spécifique pour des applications dans les marchés agricoles spécialisés.',
    descriptionAnglais: 'Belt specific for specialized agricultural market applications.',
    usageFrancais: 'Applications agricoles spécialisées.',
    usageAnglais: 'Specialized agricultural applications.',
    materieuxFrancais: 'Caoutchouc EPDM avec cordons en Kevlar (aramide)',
    materieuxAnglais: 'EPDM rubber with aramid (Kevlar) tensile cords',
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie trapézoïdale classique crantée', 
    nomAnglais: 'Cogged Classic V Belt',
    descriptionFrancais: 'Courroie trapézoïdale crantée offrant une meilleure flexibilité et dissipation de chaleur.',
    descriptionAnglais: 'Cogged trapezoidal belt providing better flexibility and heat dissipation.',
    usageFrancais: 'Applications à haute vitesse et forte puissance.',
    usageAnglais: 'High speed and high power applications.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords',
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie trapézoïdale étroite crantée bandée', 
    nomAnglais: 'Banded Cogged Narrow V Belt',
    descriptionFrancais: 'Courroie étroite crantée et renforcée par une bande pour durabilité améliorée.',
    descriptionAnglais: 'Notched narrow belt reinforced with band for enhanced durability.',
    usageFrancais: 'Applications automobiles et industrielles exigeantes.',
    usageAnglais: 'Demanding automotive and industrial applications.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords',
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie textile multi-couches', 
    nomAnglais: 'Multi-ply Textile Conveyor Belts',
    descriptionFrancais: 'Courroies textiles multi-couches pour convoyage industriel.',
    descriptionAnglais: 'Multi-ply textile belts for industrial conveyor applications.',
    usageFrancais: 'Systèmes de convoyage industriels.',
    usageAnglais: 'Industrial conveyor systems.',
    materieuxFrancais: 'Tissus textiles haute résistance avec revêtement en caoutchouc',
    materieuxAnglais: 'High-strength textile fabrics with rubber coating',
    familleNom: 'Courroie Caoutchouc' },


  { nomFrancais: 'Courroie automobile', 
    nomAnglais: 'Automotive Belt',
    descriptionFrancais: 'Courroie utilisée dans diverses applications automobiles.',
    descriptionAnglais: 'Belt used in various automotive applications.',
    usageFrancais: 'Systèmes automobiles divers.',
    usageAnglais: 'Various automotive systems.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords', 
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie moto', 
    nomAnglais: 'Motorcycle Belt',
    descriptionFrancais: 'Courroie spécifiquement conçue pour les motos.',
    descriptionAnglais: 'Belt specifically designed for motorcycles.',
    usageFrancais: 'Transmission moto.',
    usageAnglais: 'Motorcycle transmission.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords',     
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie Poly V', 
    nomAnglais: 'Poly V Belt',
    descriptionFrancais: 'Courroie poly-V à multiples nervures offrant haute performance.',
    descriptionAnglais: 'Multi-ribbed poly V-belt offering high performance.',
    usageFrancais: 'Applications automobiles et industrielles.',
    usageAnglais: 'Automotive and industrial applications.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords', 
    familleNom: 'Courroie Caoutchouc' },

  { nomFrancais: 'Courroie trapézoïdale crantée bandée', 
    nomAnglais: 'Banded Cogged V Belt',
    descriptionFrancais: 'Courroie crantée et bandée pour une durabilité et performance accrues.',
    descriptionAnglais: 'Notched and banded belt for increased durability and performance.',
    usageFrancais: 'Applications industrielles lourdes.',
    usageAnglais: 'Heavy industrial applications.',
    materieuxFrancais: 'Caoutchouc naturel (NR) avec cordons en polyester ou coton / Caoutchouc chloroprène (CR) avec cordons polyester',
    materieuxAnglais: 'Natural rubber (NR) with polyester or cotton cords / Chloroprene rubber (CR) with polyester tensile cords',
    familleNom: 'Courroie Caoutchouc' }
];

async function seedDatabase() {
  try {
    console.log('🔄 Initialisation du remplissage de la base de données...');

    // 2️⃣ Insérer les familles
    const insertedFamilles = await db.Famille.bulkCreate(familles, { returning: true });
    console.log(`✅ ${insertedFamilles.length} familles insérées.`);

    // 3️⃣ Préparer les types avec les bons `famille_id`
    const typesToInsert = types.map(t => {
      const famille = insertedFamilles.find(f => f.nomFrancais === t.familleNom);
      if (!famille) throw new Error(`Famille non trouvée pour le type: ${t.nomFrancais}`);
      return {
        nomFrancais: t.nomFrancais,
        nomAnglais: t.nomAnglais,
        descriptionFrancais: t.descriptionFrancais,
        descriptionAnglais: t.descriptionAnglais,
        usageFrancais: t.usageFrancais,
        usageAnglais: t.usageAnglais,
        materiauxFrancais: t.materieuxFrancais,
        materiauxAnglais: t.materieuxAnglais,
        famille_id: famille.id
      };
    });

    // 4️⃣ Insérer les types
    const insertedTypes = await db.Types.bulkCreate(typesToInsert, { returning: true });
    console.log(`✅ ${insertedTypes.length} types insérés.`);

    console.log('🎉 Base de données remplie avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
  }
}

module.exports = { seedDatabase };
