const get_new_node_set = (question_tree_structure, step_teach_info) => {
    const new_node_set = [];
    const q = [];
    q.push(question_tree_structure);
    new_node_set.push({
        father: null,
        children_ids: question_tree_structure.children.map(item => item.id),
        children: question_tree_structure.children,
        children_type: question_tree_structure.children.length <= 0 ? null : (question_tree_structure.children.every(item => item.type === 1) ? 1 : (question_tree_structure.children.every(item => item.type === 0) ? 0 : 2)),
        important_children_ids: question_tree_structure.children.filter(item => item.type === 1 && step_teach_info[item.id].is_important).map(item => item.id),
        id: question_tree_structure.id,
        type: question_tree_structure.type,
        is_only_child: false,
        next_brother: null,
    });
    while (q.length !== 0) {
        const curNode = q.shift();
        curNode.children.forEach((child, index) => {
            // 1-step 0-thought 2-hybrid null
            const new_child_node = {
                father: curNode,
                children_ids: child.children.map(item => item.id),
                children: child.children,
                children_type: child.children.length <= 0 ? null : (child.children.every(item => item.type === 1) ? 1 : (child.children.every(item => item.type === 0) ? 0 : 2)),
                important_children_ids: child.children.filter(item => item.type === 1 && step_teach_info[item.id].is_important).map(item => item.id),
                id: child.id,
                type: child.type,
                is_only_child: curNode.children.length <= 1,
                next_brother: curNode.children[index + 1] ? curNode.children[index + 1] : null,
            };
            new_node_set.push(new_child_node);
            q.push(child);
        });
    }
    return new_node_set;
};

const divide_children_by_important_step = (important_children_ids, children, max_id) => {
    const groups = [];
    let group_order = 1;
    let tmp_arr = [];
    let tmp_arr_order = 1;
    children.forEach((item) => {
        if (groups.length >= important_children_ids.length) {
            groups.push(item);
            item.order = group_order;
            group_order += 1;
        } else {
            item.order = tmp_arr_order;
            tmp_arr_order += 1;
            tmp_arr.push(item);
            if (important_children_ids.includes(item.id)) {
                groups.push(create_a_node_with_children(tmp_arr, group_order, max_id));
                max_id += 1;
                tmp_arr = [];
                tmp_arr_order = 1;
                group_order += 1;
            }
        }
    });
    if (groups.length === 0) {
        tmp_arr.forEach((item) => {
            item.order = group_order;
            groups.push(item);
            group_order += 1;
        });
    }
    return groups;
};

const create_a_node_with_children = (new_children, new_order, max_id) => {
    return {
        id: max_id.toString(),
        type: 0,
        order: new_order,
        children: new_children,
    };
};

const find_father_in_tree = (node_id, tree) => {
    const q = [];
    q.push(tree);
    while (q.length !== 0) {
        const curNode = q.shift();
        if (curNode.children.filter(item => item.id === node_id).length > 0) {
            return curNode;
        }
        curNode.children.forEach(child => q.push(child));
    }
    return undefined;
};

const find_father_next_brother_in_tree = (node_id, new_node_set, tree) => {
    let father_next_brother_id = null;
    for (let item of new_node_set) {
        if (item.children_ids.includes(node_id)) {
            father_next_brother_id = item.next_brother ? item.next_brother.id : null;
            break;
        }
    }
    const q = [];
    q.push(tree);
    while (q.length !== 0) {
        const curNode = q.shift();
        if (curNode.id === father_next_brother_id && curNode.children.every(item => item.type === 1)) {
            return curNode;
        } else if (curNode.id === father_next_brother_id && curNode.children.some(item => item.type === 0)) {
            return curNode.children[0];
        }
        curNode.children.forEach(child => q.push(child));
    }
    return undefined;
}

const resetOrder = (tree) => {
    const fn = (child) => {
        if (!child.children) {
            return;
        }
        child.children.map((item, i) => {
            item.order = i + 1;
            if (item.children.length > 0) {
                fn(item);
            }
        });
    };
    fn(tree);
    return tree;
};

const main = (question_tree_structure, step_teach_info, max_structure_id) => {
    const new_node_set = get_new_node_set(question_tree_structure, step_teach_info);
    const created_thought_ids = [];
    const step_list = ['1', '2', '3', '4', '5'];
    if (step_list.every(item => !step_teach_info[item].is_important)) {
        // TODO 是否所有步骤都不是重要步骤
        const temp_step_list = [];
        question_tree_structure.children.forEach((item) => {
            if (item.type === 0) {
                item.children.forEach(step => {
                    temp_step_list.push(step);
                })
            } else {
                temp_step_list.push(item);
            }
        })
        question_tree_structure.children = temp_step_list;
        return resetOrder(question_tree_structure);
    }
    // console.log('----------------------', JSON.stringify(new_node_set));
    for (const each of new_node_set) {

        if (each.id === '0') {
            // 1-都是步骤，0-都是思路，2-混合
            if (each.children_type === 1) {
                question_tree_structure.children = divide_children_by_important_step(each.important_children_ids, each.children, max_structure_id);
                max_structure_id += 1;
            } else if (each.children_type === 2) {
                let tmp_arr = [];
                const new_children = [];
                let order = 1;
                let sub_order = 1;
                for (const child of each.children) {
                    // 如果是思路
                    if (child.type === 0) {
                        child.order = order;
                        order += 1;
                        new_children.push(child);
                        continue;
                    }
                    // 步骤，加入临时数组
                    child.order = sub_order;
                    tmp_arr.push(child);
                    sub_order += 1;
                    if (step_teach_info[child.id].is_important) {
                        new_children.push(create_a_node_with_children(tmp_arr, order, max_structure_id));
                        created_thought_ids.push(max_structure_id);
                        order += 1;
                        tmp_arr = [];
                    }
                }
                tmp_arr.forEach((item) => {
                    item.order = order;
                    new_children.push(item);
                    order += 1;
                });
                question_tree_structure.children = new_children;
            }
        } else if (each.children_type === 1) {
            const father = find_father_in_tree(each.id, question_tree_structure);
            const new_children = [];
            // 如果有重要步骤
            if (each.important_children_ids.length > 0) {
                // 如果最后一步是隐藏步骤，其他都不是，跳出
                if (each.important_children_ids.length === 1 && each.important_children_ids[0] === each.children_ids[each.children_ids.length - 1]) {
                    continue;
                }
                const groups = divide_children_by_important_step(each.important_children_ids, each.children, max_structure_id);
                // console.log('groups', groups);
                created_thought_ids.push(max_structure_id);
                for (const child of father.children) {
                    if (child.id === each.id) {
                        groups.forEach(item => new_children.push(item));
                    } else {
                        new_children.push(child);
                    }
                }
                father.children = new_children;
            } else {
                // console.log('----------------------------', JSON.stringify(father));
                if (each.next_brother && each.next_brother.children.every(item => item.type === 1)) {
                    for (const child of father.children) {
                        if (child.id === each.id) {
                            continue;
                        }
                        if (child.id === each.next_brother.id) {
                            each.children.forEach((item, index) => each.next_brother.children.splice(index, 0, item));
                            new_children.push(each.next_brother);
                        } else {
                            new_children.push(child);
                        }
                    }
                    father.children = new_children;
                } else if (each.next_brother && each.next_brother.children.some(item => item.type === 0)) {
                    for (const child of father.children) {
                        if (child.id === each.id) {
                            continue;
                        }
                        if (child.id === each.next_brother.id) {
                            each.children.forEach((item, index) => each.next_brother.children[0].children.splice(index, 0, item));
                            new_children.push(each.next_brother);
                        } else {
                            new_children.push(child);
                        }
                    }
                    father.children = new_children;
                } else if (!find_father_next_brother_in_tree(each.id, new_node_set, question_tree_structure)) {
                    for (const child of father.children) {
                        if (child.id !== each.id) {
                            // continue;
                            new_children.push(child);
                        }
                    }
                    father.children = new_children;
                    each.children.forEach(item => {
                        question_tree_structure.children.push(item);
                    })
                } else if (find_father_next_brother_in_tree(each.id, new_node_set, question_tree_structure).children.every(item => item.type === 1)) {
                    const father_brother = find_father_next_brother_in_tree(each.id, new_node_set, question_tree_structure);
                    for (const child of father.children) {
                        if (child.id !== each.id) {
                            // continue;
                            new_children.push(child);
                        }
                    }
                    father.children = new_children;
                    each.children.forEach((item, index) => father_brother.children.splice(index, 0, item));
                }
                // else if (each.father.next_brother && each.father.next_brother.children[0].type === 0 && each.father.next_brother.children[0].children.every(item => item.type === 1)) {
                //     each.father.forEach(item => {
                //         if (item.id !== each.id) {
                //             // continue;
                //             new_children.push(item);
                //         }
                //     })
                //     father.children = new_children;
                //     each.children.forEach((item, index) => each.father.next_brother.children.splice(index, 0, item));
                // }
                else {
                    const arr = [];
                    for (const c of father.children) {
                        if (c.id !== each.id) {
                            arr.push(c);
                        }
                    }
                    father.children = arr;
                    each.children.forEach(item => question_tree_structure.children.push(item));
                }
            }
        }
    }
    return resetOrder(question_tree_structure);
};

module.exports = { main, divide_children_by_important_step };