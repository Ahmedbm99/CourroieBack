const CourroieController = require('./controllers/CourroieController');
const FamilleController = require('./controllers/FamilleController');
const TypesController = require('./controllers/TypesController');

module.exports = (app) => {
    // Routes pour la gestion des courroies
    app.put('/apiv1/courroies/:id', CourroieController.updateCourroie);  // Mettre à jour une courroie
    app.get('/apiv1/courroies/:id', CourroieController.getBeltByID);      // Obtenir une courroie par ID
    app.get('/apiv1/courroies', CourroieController.getAllBelts);           // Obtenir toutes les courroies
    app.get('/apiv1/courroies/famille/:famille_id', CourroieController.getBeltsByFamily);  // Par famille
    app.get('/apiv1/courroies/type/:type_id', CourroieController.getBeltsByType);          // Par type
    app.get('/apiv1/courroies/famille/:famille_id/type/:type_id', CourroieController.getBeltsByFamilyAndType);  // Par famille et type
    app.get('/apiv1/courroies/profil/:profile', CourroieController.getBeltsByProfile);  // Par profil
    app.get('/apiv1/courroies/dimensions', CourroieController.getBeltsByDimensions);  // Par dimensions
    app.get('/apiv1/courroies/profil/:profile/dimensions/:dimension', CourroieController.getBeltsByProfileAndDimensions);  // Profil et dimensions
    app.get('/apiv1/courroies/profil/:profile/dimensions/:dimension/type/:type_id', CourroieController.getBeltsByProfileDimensionsAndType);  // Profil, dimensions et type
    app.get('/apiv1/courroies/profil/:profile/dimensions/:dimension/type/:type_id/famille/:famille_id', CourroieController.getBeltsByProfileDimensionsTypeAndFamily); // Profil, dimensions, type et famille
    app.get('/apiv1/courroies/profil', CourroieController.getAllBeltsProfile); // Obtenir tous les profils de courroies

    // Routes pour la gestion des familles
    app.put('/apiv1/familles/:id', FamilleController.updateFamille);        // Mettre à jour une famille
    app.get('/apiv1/familles/:id', FamilleController.getFamilleByID);      // Obtenir une famille par ID
    app.get('/apiv1/familles', FamilleController.getAllFamille);           // Obtenir toutes les familles

    // Routes pour la gestion des types
    app.put('/apiv1/types/:id', TypesController.updateType);              // Mettre à jour un type
    app.get('/apiv1/types/:id', TypesController.getTypesByID);            // Obtenir un type par ID
    app.get('/apiv1/types', TypesController.getAllTypes);                 // Obtenir tous les types
    app.get('/apiv1/types/famille/:famille_id', TypesController.getTypesByFamily); // Obtenir les types par famille
};
