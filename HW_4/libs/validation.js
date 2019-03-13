module.exports.uploadValidation = (producName, price, name) => {
    let response;
  
    if (producName === '') {
      response = {
        mes: 'Не указано название продукта',
        status: 'Error',
      };
    }
    
    if (price === '') {
        response = {
          mes: 'Не указана цена продукта',
          status: 'Error',
        };
      }
    
    if (name === '') {
      response = {
        mes: 'Не загружена картинка',
        status: 'Error',
      };
    }
  
    return response;
  };
  
  module.exports.skillsValidation = (age, concerts, cities, years) => {
    let response;
  
    if (age === '') {
      response = {
        mes: 'Не указан возраст начала занятий на скрипке',
        status: 'Error',
      };
    }
    
    if (concerts === '') {
        response = {
          mes: 'Не указано число отыгранных концертов',
          status: 'Error',
        };
      }
    
      if (cities === '') {
        response = {
          mes: 'Не указано число городов в туре',
          status: 'Error',
        };
      }

      if (years === '') {
        response = {
          mes: 'Не указано количесвто лет на сцене',
          status: 'Error',
        };
      }
  
    return response;
  };

  module.exports.messageValidation = (name, email, message) => {
    let response;
  
    if (name === '') {
      response = {
        mes: 'Не указано имя',
        status: 'Error',
      };
    }

    if (email === '') {
        response = {
          mes: 'Не указан email',
          status: 'Error',
        };
      }

      if (message === '') {
        response = {
          mes: 'Сообзение обязательно',
          status: 'Error',
        };
      }

      return response;
  };
  