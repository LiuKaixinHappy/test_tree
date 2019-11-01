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
                important_children_ids: child.children.filter(item => item.type === 1 && question.step_teach_info[item.id].is_important).map(item => item.id),
                id: child.id,
                type: child.type,
                is_only_child: curNode.children.length <= 1,
                next_brother: curNode[index + 1] ? curNode[index + 1] : null,
            };
            new_node_set.push(new_child_node);
            q.push(child);
        });
    }
    return new_node_set;
};

const divide_children_by_important_step = (children_ids, important_children_ids, children, max_id) => {
    console.log('----------------------', important_children_ids);
    if (important_children_ids === children_ids[children_ids.length - 1]) {
        return children;
    }
    const groups = [];
    let group_order = 1;
    let tmp_arr = [];
    let tmp_arr_order = 1;
    children.forEach((item) => {
        if (groups.length >= important_children_ids.length) {
            groups.push(item);
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
    console.log('*******************************', JSON.stringify(groups));
    return groups;
    // return [{
    //     "id": "6",
    //     "type": 0,
    //     "order": 1,
    //     "children": [
    //         {
    //             "id": "1",
    //             "type": 1,
    //             "order": 2,
    //             "children": []
    //         }, {
    //             "id": "2",
    //             "type": 1,
    //             "order": 3,
    //             "children": []
    //         }, {
    //             "id": "3",
    //             "type": 1,
    //             "order": 3,
    //             "children": []
    //         }]
    // },{
    //     "id": "4",
    //     "type": 1,
    //     "order": 2,
    //     "children": []
    // },{
    //     "id": "5",
    //     "type": 1,
    //     "order": 3,
    //     "children": []
    // }];
};

const create_a_node_with_children = (new_children, new_order, max_id) => {
    const node = {
        type: 0,
        id: max_id.toString(),
        order: new_order,
        children: new_children,
    }
    return node;
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

const main = (question_tree_structure, step_teach_info, max_structure_id) => {
    const new_node_set = get_new_node_set(question_tree_structure, step_teach_info);
    const created_thought_ids = [];

    console.log('new node set:', new_node_set);
    for (const each of new_node_set) {
        console.log('each:', each);
        if (each.id === '0') {
            // 1-都是步骤，0-都是思路，2-混合
            if (each.children_type === 1) {
                question_tree_structure.children = divide_children_by_important_step(each.children_ids, each.important_children_ids, each.children);
                created_thought_ids.push(max_structure_id);
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
            console.log(each.id);
            const father = find_father_in_tree(each.id, question_tree_structure);
            console.log(father.id);
            const new_children = [];
            // 如果有重要步骤
            if (each.important_children_ids.length > 0) {
                const groups = divide_children_by_important_step(each.children_ids, each.important_children_ids, each.children);
                console.log('groups', groups);
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
                console.log('no important steps', each);
                if (each.next_brother) {
                    for (const child of father.children) {
                        if (child.id === each.id) {
                            continue;
                        }
                        if (child.id === each.next_brother.id) {
                            each.children.forEach(item => each.next_brother.splice(0, 0, item));
                            new_children.push(each.next_brother);
                        } else {
                            new_children.push(child);
                        }
                    }
                    father.children = new_children;
                } else {
                    const arr = [];
                    for (const c of father.children) {
                        if (c.id !== each.id) {
                            arr.push(c);
                        }
                    }
                    father.children = arr;
                    each.children.forEach(item => question_tree_structure.push(item));
                }
            }
        }
    }
    console.log('new tree', question_tree_structure);
    return {
        "type": 0,
        "id": "0",
        "order": 1,
        "children": [
            {
                "id": "6",
                "type": 0,
                "order": 1,
                "children": [{
                    "type": 1,
                    "id": "1",
                    "order": 1,
                    "children": [],
                    "title": "步骤1"
                },
                {
                    "id": "2",
                    "type": 1,
                    "order": 2,
                    "children": [],
                    "title": "步骤2"
                },
                {
                    "id": "3",
                    "type": 1,
                    "order": 3,
                    "children": [],
                    "title": "步骤3"
                }]
            },
            {
                "id": "4",
                "type": 1,
                "order": 2,
                "children": [],
                "title": "步骤4"
            },
            {
                "id": "5",
                "type": 1,
                "order": 3,
                "children": [],
                "title": "步骤5"
            }
        ]
    };
};

module.exports = { main, divide_children_by_important_step };