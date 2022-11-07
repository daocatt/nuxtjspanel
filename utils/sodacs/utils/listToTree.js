/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
class listToTree {
  constructor(optiens = {}) {
    this.config(optiens);
  }

  config(optiens) {
    this.parentKey = optiens.parentKey;
    this.idKey = optiens.idKey;
    this.parentId = optiens.parentId;
    this.name = optiens.name;
    this.title = optiens.title;
    this.childrenKey = optiens.childrenKey;
    this.fields = {};
    this.addFields = {};
    this.delFields = [];
    this.rawData = [];
    return this;
  }

  on(list) {
    this.tree = [];
    const parent = this.parent || {};
    this.ToTree(list, this.tree, this.parentId, parent);
    return this;
  }

  ToTree(list, tree, parentId = 0, parent = {}) {
    const pkey = this.parentKey;
    const ckey = this.childrenKey;
    const idKey = this.idKey;
    let number = 0;
    list.forEach((item, index) => {
      // 判断是否为父级菜单
      if (item[pkey].toString() === parentId.toString()) {
        // let newItem = Object.assign(item, this.addFields);
        let child = this.toField(item, parent, index, number);
        child[ckey] = [];
        // 处理需要删除的字段
        for (const i in this.delFields) {
          const _key = this.delFields[i];
          if (child[_key]) {
            delete child[_key];
          }
        }
        // 迭代 list， 找到当前菜单相符合的所有子菜单
        this.ToTree(list, child[ckey], item[idKey], child);
        // 删掉不存在 children 值的属性
        if (child[ckey].length <= 0) {
          delete child[ckey];
        }
        // 数组阻隔后，将对象数据返回
        if (child) {
          child = JSON.parse(JSON.stringify(child));
          delete child.$_index;
          delete child.$_path;
          delete child.$_name;
          delete child.$_title;
        }
        // 加入到树中
        tree.push(child);
        number++;
      }
    });
  }

  /**
   * 用于处理字段
   * @param  {[type]}   fkey [description]
   * @param  {Function} cb   [description]
   * @return {[type]}        [description]
   */
  field(fkey, cb = null) {
    this.fields[fkey] = cb;
    return this;
  }

  /**
   * 添加字段
   * @param {[type]} field [description]
   * @param {[type]} value [description]
   */
  add(field, value) {
    this.addFields[field] = value;
    return this;
  }

  /**
   * 删除字段
   * @param  {[type]} field [description]
   * @return {[type]}       [description]
   */
  del(field) {
    this.delFields.push(field);
    return this;
  }

  /**
   * 处理字段
   * @param  {[type]} child [description]
   * @return {[type]}       [description]
   */
  toField(child, parent = {}, index, number) {
    const fields = {};
    for (const i in child) {
      const item = child[i];
      if (this.fields[i]) {
        fields[i] = this.fields[i](item, child, parent);
      } else {
        fields[i] = item;
      }
    }
    // 特殊字段处理
    fields.$_index = index;
    if (parent.$_path) {
      fields.$_path = parent.$_path + '-' + number;
      fields.$_name = parent.$_name + '-' + child[this.name];
      fields.$_title = parent.$_title + '-' + child[this.title];
    } else {
      fields.$_path = number;
      fields.$_name = child[this.name];
      fields.$_title = child[this.title];
    }
    // 处理原始数据信息
    this.rawData[index] = fields;

    return fields;
  }

  /**
   * 执行数据搜索
   * @param  {[type]} key   搜索的字段
   * @param  {[type]} value 搜索的数值
   * @return {[type]}       [description]
   */
  search(key, value, isFull = true) {
    const greaterThanTen = this.rawData.filter(element => {
      if (isFull) {
        return element[key] === value;
      } else {
        const str = ['', ...value, ''].join('.*'); // 转化成正则格式的字符串
        const reg = new RegExp(str); // 正则
        return reg.test(element[key]); // 去匹配待查询的字符串
      }
    });
    if (isFull && greaterThanTen.length) {
      return greaterThanTen[0];
    } else {
      return greaterThanTen;
    }
  }

  /**
   * 获取结果
   * @return {[type]} [description]
   */
  get() {
    return this.tree;
  }
}

export default listToTree;
