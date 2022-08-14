const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);

Task.clearCompleted = async function () {
 await this.destroy({
    where: {
      complete: true
    }
  })
}

Task.completeAll = async function () {
 await this.update({complete: true},{
    where: {
      complete: false
    }
  })
}

Task.prototype.getTimeRemaining = function () {
  let time = this.due
  let today = new Date()
  
  today = today.getTime()
  
  if (time === undefined) {
    return Infinity
  }
  let dueDate = time.getTime()

  dueDate -= today
  
  return dueDate
}

Task.prototype.isOverdue = function () {
  let time = this.due
  let today = new Date()
  
  today = today.getTime()
  let dueDate = time.getTime() 
  
  if((dueDate < today) && this.complete === false){
    return true
  }
  
  return false
  
}

Task.prototype.assignOwner = async function (owner) {

  const ownerPromise = await this.setOwner(owner)

  return ownerPromise
  
}

Owner.getOwnersAndTasks = async function () {
  
const ownersAndTasks =  await this.findAll({include: Task})

return ownersAndTasks
}

Owner.prototype.getIncompleteTasks = async function () {
  const incompleteTasks =  await Owner.findAll({
    include: {
      model: Task,
      where: {
        complete: false
      }
    }
  })
  
  return incompleteTasks[0].Tasks
  
}

Owner.beforeDestroy(owner => {
  if((owner.name === 'Grace Hopper')){
    console.log(owner)
    console.log(Owner.dataValues.name)
    throw new Error
  }
})



//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
