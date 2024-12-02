const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  
    
    category_name: { type: String, required:true, unique: true},  
    subCategories: [
        {
          subCategoryName: { type: String, unique: true },
          assignto:[{
            employeeId:{type: String}
          }],
          status:{type:Boolean,default:true}
        },
      ],
      status:{type:Boolean,default:true}
      
    
  },
  {timestamps: true
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
