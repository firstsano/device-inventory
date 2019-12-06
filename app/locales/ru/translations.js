// use CamelCase
export default {
  site: {
    inventory: 'инвентаризация',
    actions: {
      add: 'добавить',
      create: 'создать',
      edit: 'редактировать',
      update: 'обновить',
      delete: 'удалить',
      filter: 'отфильтровать',
      cancel: 'отмена',
      save: 'сохранить',
      back: 'вернуться',
      pending: 'пожалуйста, подождите...',
      search: 'поиск',
      confirm: 'подтвердить'
    },
    captions: {
      table: 'таблица',
      show: 'карточка',
      edit: 'редактирование',
      new: 'создание',
      deviceMovement: 'движение устройств',
      agents: 'контрагенты',
      deviceControls: 'управление устройствами',
      devices: 'устройства',
      transactions: {
        new: 'Новая транзакция'
      }
    },
    common: {
      true: 'да',
      false: 'нет',
      noMatches: 'поиск не дал результатов',
      confirmDelete: 'вы уверены, что хотите удалить запись?'
    }
  },

  controls: {
    deviceMac: 'MAC устройства',
    selectedAgent: 'выбранный контрагент',
    targetAgent: 'целевой контрагент',
    deviceScan: 'сканнер штрихкода',
    agentFrom: 'отправил',
    agentTo: 'получил',

    hints: {
      deviceScan: {
        example: 'пример: 002722EC3EDD',
        startScan: 'приступайте к сканированию',
        this: 'для сканирования штрихкода кликните по этому полю',
        top: 'для начала сканирования кликните по полю выше',
      }
    }
  },

  models: {
    plurals: {
      agentType: 'типы агентов',
      agent: 'контрагенты',
      device: 'устройства',
      devType: 'типы устройств'
    },
    attributes: {
      agentType: {
        name: 'название',
        hasUserProfile: 'используется профиль пользователя'
      },
      agent: {
        name: 'имя контрагента',
        groupName: 'тип агента',
        agentName: 'имя контрагента',
      },
      device: {
        mac: 'mac-адрес устройства',
        devType: 'тип устройства'
      },
      transaction: {
        transactionTime: 'время операции',
        description: 'описание'
      }
    }
  },

  other: {
    sendDevice: 'передать устройство',
    formDocument: 'сформировать документ'
  }
};
