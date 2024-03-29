const main = require('../main/main');
// const  = require('../main/main');
// import {divide_children_by_important_step, main} from "../main/main";

describe('main()', () => {

  it('测试divide_children_by_important_step-----1', () => {
    const max_id = 6;
    const children_ids = ["1", "2", "3", "4", "5"];
    const important_children_ids = ["3"];
    const children = [
      {
        "id": "1",
        "type": 1,
        "order": 1,
        "children": []
      },
      {
        "id": "2",
        "type": 1,
        "order": 2,
        "children": []
      },
      {
        "id": "3",
        "type": 1,
        "order": 3,
        "children": [],
      },
      {
        "id": "4",
        "type": 1,
        "order": 4,
        "children": []
      },
      {
        "id": "5",
        "type": 1,
        "order": 5,
        "children": []
      }
    ];
    const expected = JSON.stringify([
      {
        "id": "6",
        "type": 0,
        "order": 1,
        "children": [
          {
            "id": "1",
            "type": 1,
            "order": 1,
            "children": []
          }, {
            "id": "2",
            "type": 1,
            "order": 2,
            "children": []
          }, {
            "id": "3",
            "type": 1,
            "order": 3,
            "children": []
          }]
      }, {
        "id": "4",
        "type": 1,
        "order": 2,
        "children": []
      },
      {
        "id": "5",
        "type": 1,
        "order": 3,
        "children": []
      }]);

    expect(JSON.stringify(main.divide_children_by_important_step(important_children_ids, children, max_id))).toBe(expected);
  });

  it('测试divide_children_by_important_step------2', () => {
    const max_id = 6;
    const children_ids = ["1", "2", "3", "4", "5"];
    const important_children_ids = ["3", "5"];
    const children = [
      {
        "id": "1",
        "type": 1,
        "order": 1,
        "children": []
      },
      {
        "id": "2",
        "type": 1,
        "order": 2,
        "children": []
      },
      {
        "id": "3",
        "type": 1,
        "order": 3,
        "children": [],
      },
      {
        "id": "4",
        "type": 1,
        "order": 4,
        "children": []
      },
      {
        "id": "5",
        "type": 1,
        "order": 5,
        "children": []
      }
    ];
    const expected = JSON.stringify([
      {
        "id": "6",
        "type": 0,
        "order": 1,
        "children": [
          {
            "id": "1",
            "type": 1,
            "order": 1,
            "children": []
          }, {
            "id": "2",
            "type": 1,
            "order": 2,
            "children": []
          }, {
            "id": "3",
            "type": 1,
            "order": 3,
            "children": []
          }]
      },
      {
        "id": "7",
        "type": 0,
        "order": 2,
        "children": [{
          "id": "4",
          "type": 1,
          "order": 1,
          "children": []
        },
          {
            "id": "5",
            "type": 1,
            "order": 2,
            "children": []
          }]
      }]);

    expect(JSON.stringify(main.divide_children_by_important_step(important_children_ids, children, max_id))).toBe(expected);
  });

  it('测试divide_children_by_important_step------3', () => {
    const max_id = 6;
    const children_ids = ["1", "2", "3", "4", "5"];
    const important_children_ids = ["3", "4"];
    const children = [
      {
        "id": "1",
        "type": 1,
        "order": 1,
        "children": []
      },
      {
        "id": "2",
        "type": 1,
        "order": 2,
        "children": []
      },
      {
        "id": "3",
        "type": 1,
        "order": 3,
        "children": [],
      },
      {
        "id": "4",
        "type": 1,
        "order": 4,
        "children": []
      },
      {
        "id": "5",
        "type": 1,
        "order": 5,
        "children": []
      }
    ];
    const expected = JSON.stringify([
      {
        "id": "6",
        "type": 0,
        "order": 1,
        "children": [
          {
            "id": "1",
            "type": 1,
            "order": 1,
            "children": []
          }, {
            "id": "2",
            "type": 1,
            "order": 2,
            "children": []
          }, {
            "id": "3",
            "type": 1,
            "order": 3,
            "children": []
          }]
      },
      {
        "id": "7",
        "type": 0,
        "order": 2,
        "children": [{
          "id": "4",
          "type": 1,
          "order": 1,
          "children": []
        }]
      },
      {
        "id": "5",
        "type": 1,
        "order": 3,
        "children": []
      }]);

    expect(JSON.stringify(main.divide_children_by_important_step(important_children_ids, children, max_id))).toBe(expected);
  });

  it('根节点+一个中间重要步骤，应该生成思路+步骤节点', () => {
    const question_tree_structure = {
      "type": 0,
      "id": "0",
      "order": 1,
      "children": [
        {
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
        },
        {
          "id": "4",
          "type": 1,
          "order": 4,
          "children": [],
          "title": "步骤4"
        },
        {
          "id": "5",
          "type": 1,
          "order": 5,
          "children": [],
          "title": "步骤5"
        }
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 6;
    const expected = JSON.stringify({
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
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('根节点+2个中间重要步骤，应该生成思路+思路', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "6",
          "type": 0,
          "order": 1,
          "children": [
            {
              "type": 1,
              "id": "1",
              "order": 1,
              "children": []
            },
            {
              "id": "2",
              "type": 1,
              "order": 2,
              "children": []
            },
            {
              "id": "3",
              "type": 1,
              "order": 3,
              "children": []
            }]
        },
        {
          "id": "4",
          "type": 1,
          "order": 2,
          "children": []
        },
        {
          "id": "5",
          "type": 1,
          "order": 3,
          "children": []
        }
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 7;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "6",
          "type": 0,
          "order": 1,
          "children": [
            {
              "type": 1,
              "id": "1",
              "order": 1,
              "children": []
            },
            {
              "id": "2",
              "type": 1,
              "order": 2,
              "children": []
            },
            {
              "id": "3",
              "type": 1,
              "order": 3,
              "children": []
            }]
        },
        {
          "id": "7",
          "type": 0,
          "order": 2,
          "children": [
            {
              "id": "4",
              "type": 1,
              "order": 1,
              "children": []
            },
            {
              "id": "5",
              "type": 1,
              "order": 2,
              "children": []
            }]
        },
      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('2-true, 3-true, 5-true', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "6",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "1",
              "type": 1,
              "order": 1,
              "children": []
            },
            {
              "id": "2",
              "type": 1,
              "order": 2,
              "children": []
            },
            {
              "id": "3",
              "type": 1,
              "order": 3,
              "children": []
            }]
        },
        {
          "id": "7",
          "type": 0,
          "order": 2,
          "children": [{
            "id": "4",
            "type": 1,
            "order": 1,
            "children": []
          },
            {
              "id": "5",
              "type": 1,
              "order": 2,
              "children": []
            }]
        },
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 8;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "8",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "1",
              "type": 1,
              "order": 1,
              "children": []
            },
            {
              "id": "2",
              "type": 1,
              "order": 2,
              "children": []
            },
          ]
        },
        {
          "id": "9",
          "type": 0,
          "order": 2,
          "children": [
            {
              "id": "3",
              "type": 1,
              "order": 1,
              "children": []
            }]
        },
        {
          "id": "7",
          "type": 0,
          "order": 3,
          "children": [
            {
              "id": "4",
              "type": 1,
              "order": 1,
              "children": []
            },
            {
              "id": "5",
              "type": 1,
              "order": 2,
              "children": []
            }]
        },
      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('带子思路的进一步拆分(1-true, 2-true, 3-true, 5-true)', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "10",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "8",
              "type": 0,
              "order": 1,
              "children": [
                {
                  "id": "1",
                  "type": 1,
                  "order": 1,
                  "children": []
                },
                {
                  "id": "2",
                  "type": 1,
                  "order": 2,
                  "children": []
                }]
            }, {
              "id": "9",
              "type": 0,
              "order": 2,
              "children": [{
                "id": "3",
                "type": 1,
                "order": 2,
                "children": []
              }]
            }]
        },
        {
          "id": "7",
          "type": 0,
          "order": 2,
          "children": [{
            "id": "4",
            "type": 1,
            "order": 1,
            "children": []
          }, {
            "id": "5",
            "type": 1,
            "order": 2,
            "children": []
          }]
        },
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 11;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "10",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "11",
              "type": 0,
              "order": 1,
              "children": [
                {
                  "id": "1",
                  "type": 1,
                  "order": 1,
                  "children": []
                }]
            },
            {
              "id": "12",
              "type": 0,
              "order": 2,
              "children": [
                {
                  "id": "2",
                  "type": 1,
                  "order": 1,
                  "children": []
                }]
            },
            {
              "id": "9",
              "type": 0,
              "order": 3,
              "children": [{
                "id": "3",
                "type": 1,
                "order": 1,
                "children": []
              }]
            }]
        },
        {
          "id": "7",
          "type": 0,
          "order": 2,
          "children": [{
            "id": "4",
            "type": 1,
            "order": 1,
            "children": []
          }, {
            "id": "5",
            "type": 1,
            "order": 2,
            "children": []
          }]
        },
      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('带子思路的进一步拆分(1-true, 2-true, 3-true, 4-true，5-true)', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "10",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "11",
              "type": 0,
              "order": 1,
              "children": [
                {
                  "id": "1",
                  "type": 1,
                  "order": 1,
                  "children": []
                }]
            },
            {
              "id": "12",
              "type": 0,
              "order": 2,
              "children": [
                {
                  "id": "2",
                  "type": 1,
                  "order": 1,
                  "children": []
                }]
            },
            {
              "id": "9",
              "type": 0,
              "order": 3,
              "children": [{
                "id": "3",
                "type": 1,
                "order": 1,
                "children": []
              }]
            }]
        },
        {
          "id": "7",
          "type": 0,
          "order": 2,
          "children": [{
            "id": "4",
            "type": 1,
            "order": 1,
            "children": []
          }, {
            "id": "5",
            "type": 1,
            "order": 2,
            "children": []
          }]
        },
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 13;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "10",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "11",
              "type": 0,
              "order": 1,
              "children": [
                {
                  "id": "1",
                  "type": 1,
                  "order": 1,
                  "children": []
                }]
            },
            {
              "id": "12",
              "type": 0,
              "order": 2,
              "children": [
                {
                  "id": "2",
                  "type": 1,
                  "order": 1,
                  "children": []
                }]
            },
            {
              "id": "9",
              "type": 0,
              "order": 3,
              "children": [{
                "id": "3",
                "type": 1,
                "order": 1,
                "children": []
              }]
            }]
        },
        {
          "id": "13",
          "type": 0,
          "order": 2,
          "children": [{
            "id": "4",
            "type": 1,
            "order": 1,
            "children": []
          }]
        },
        {
          "id": "14",
          "type": 0,
          "order": 3,
          "children": [{
            "id": "5",
            "type": 1,
            "order": 1,
            "children": []
          }]
        }
      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('根节点+2个中间重要步骤+思路中两个重要步骤，应该生成思路+思路+思路', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "8",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "1",
              "type": 1,
              "order": 1,
              "children": []
            },
            {
              "id": "2",
              "type": 1,
              "order": 2,
              "children": []
            },
          ]
        },
        {
          "id": "9",
          "type": 0,
          "order": 2,
          "children": [
            {
              "id": "3",
              "type": 1,
              "order": 1,
              "children": []
            }]
        },
        {
          "id": "7",
          "type": 0,
          "order": 3,
          "children": [
            {
              "id": "4",
              "type": 1,
              "order": 1,
              "children": []
            },
            {
              "id": "5",
              "type": 1,
              "order": 2,
              "children": []
            }]
        },
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 8;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "9",
          "type": 0,
          "order": 1,
          "children": [{
            "id": "1",
            "type": 1,
            "order": 1,
            "children": []
          },
          {
            "id": "2",
            "type": 1,
            "order": 2,
            "children": []
          },
            {
              "id": "3",
              "type": 1,
              "order": 3,
              "children": []
            }]
        },
        {
          "id": "7",
          "type": 0,
          "order": 2,
          "children": [
            {
              "id": "4",
              "type": 1,
              "order": 1,
              "children": []
            },
            {
              "id": "5",
              "type": 1,
              "order": 2,
              "children": []
            }]
        },
      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('2个底层思路中去掉上方顶层思路中的重要步骤，应该合并为一个子思路', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "10",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "8",
              "type": 0,
              "order": 1,
              "children": [
                {
                  "id": "1",
                  "type": 1,
                  "order": 1,
                  "children": []
                },
                {
                  "id": "2",
                  "type": 1,
                  "order": 2,
                  "children": []
                }]
            },{
              "id": "9",
              "type": 0,
              "order": 2,
              "children": [
                {
                  "id": "3",
                  "type": 1,
                  "order": 1,
                  "children": []
                }]
            },
          ]
        },
        {
          "id": "7",
          "type": 0,
          "order": 2,
          "children": [
            {
              "id": "4",
              "type": 1,
              "order": 1,
              "children": []
            },
            {
              "id": "5",
              "type": 1,
              "order": 2,
              "children": []
            }]
        },
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 8;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "10",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "9",
              "type": 0,
              "order": 1,
              "children": [
                {
                  "id": "1",
                  "type": 1,
                  "order": 1,
                  "children": []
                },
                {
                  "id": "2",
                  "type": 1,
                  "order": 2,
                  "children": []
                },
                {
                  "id": "3",
                  "type": 1,
                  "order": 3,
                  "children": []
                },
              ]
            }
          ]
        },
        {
          "id": "7",
          "type": 0,
          "order": 2,
          "children": [
            {
              "id": "4",
              "type": 1,
              "order": 1,
              "children": []
            },
            {
              "id": "5",
              "type": 1,
              "order": 2,
              "children": []
            }]
        },
      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('去掉最后一个关键步骤后树里边只剩下步骤', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "6",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "1",
              "type": 1,
              "order": 1,
              "children": []
            },{
              "id": "2",
              "type": 1,
              "order": 2,
              "children": []
            },{
              "id": "3",
              "type": 1,
              "order": 3,
              "children": []
            }
          ]
        },
        {
          "id": "4",
          "type": 1,
          "order": 2,
          "children": []
        },{
          "id": "5",
          "type": 1,
          "order": 3,
          "children": []
        },
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 8;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "1",
          "type": 1,
          "order": 1,
          "children": []
        },
        {
          "id": "2",
          "type": 1,
          "order": 2,
          "children": []
        },
        {
          "id": "3",
          "type": 1,
          "order": 3,
          "children": []
        },
        {
          "id": "4",
          "type": 1,
          "order": 4,
          "children": []
        },
        {
          "id": "5",
          "type": 1,
          "order": 5,
          "children": []
        },
      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('思路中最后一个子思路中的步骤被删除，且父亲节点的兄弟节点为底层思路，移动到父亲节点的兄弟节点', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "10",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "8",
              "type": 0,
              "order": 1,
              "children": [{
                "id": "1",
                "type": 1,
                "order": 1,
                "children": []
              },{
                "id": "2",
                "type": 1,
                "order": 2,
                "children": []
              },{
                "id": "3",
                "type": 1,
                "order": 3,
                "children": []
              }]
            },{
              "id": "9",
              "type": 0,
              "order": 2,
              "children": [{
                "id": "4",
                "type": 1,
                "order": 1,
                "children": []
              }]
            }

          ]
        },{
          "id": "7",
          "type": 0,
          "order": 2,
          "children": [
            {
              "id": "5",
              "type": 1,
              "order": 1,
              "children": []
            },{
              "id": "6",
              "type": 1,
              "order": 2,
              "children": []
            }
          ]
        },

      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "6": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 11;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "10",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "8",
              "type": 0,
              "order": 1,
              "children": [{
                "id": "1",
                "type": 1,
                "order": 1,
                "children": []
              },{
                "id": "2",
                "type": 1,
                "order": 2,
                "children": []
              },{
                "id": "3",
                "type": 1,
                "order": 3,
                "children": []
              }]
            }
          ]
        },{
          "id": "7",
          "type": 0,
          "order": 2,
          "children": [
            {
              "id": "4",
              "type": 1,
              "order": 1,
              "children": []
            },
            {
              "id": "5",
              "type": 1,
              "order": 2,
              "children": []
            },{
              "id": "6",
              "type": 1,
              "order": 3,
              "children": []
            }
          ]
        },

      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('删除子思路的唯一重要步骤，其父亲的兄弟节点下是思路，则插到该思路下', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "12",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "8",
              "type": 0,
              "order": 1,
              "children": [{
                "id": "1",
                "type": 1,
                "order": 1,
                "children": []
              },{
                "id": "2",
                "type": 1,
                "order": 2,
                "children": []
              },{
                "id": "3",
                "type": 1,
                "order": 3,
                "children": []
              }]
            },
            {
              "id": "9",
              "type": 0,
              "order": 2,
              "children": [{
                "id": "4",
                "type": 1,
                "order": 1,
                "children": []
              }]
            }

          ]
        },
        {"id": "13",
          "type": 0,
          "order": 2,
          "children": [
            {
              "id": "10",
              "type": 0,
              "order": 1,
              "children": [{
                "id": "5",
                "type": 1,
                "order": 1,
                "children": []
              },{
                "id": "6",
                "type": 1,
                "order": 2,
                "children": []
              }]
            },
            {
              "id": "11",
              "type": 0,
              "order": 2,
              "children": [
                {
                  "id": "7",
                  "type": 1,
                  "order": 1,
                  "children": []
                }]
            }]
        }
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "6": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "7": {
        "text": "$\\because $二面角$D-AB_{1}-E$为锐角\n$\\therefore$余弦值为$ \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 14;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "12",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "8",
              "type": 0,
              "order": 1,
              "children": [{
                "id": "1",
                "type": 1,
                "order": 1,
                "children": []
              }, {
                "id": "2",
                "type": 1,
                "order": 2,
                "children": []
              }, {
                "id": "3",
                "type": 1,
                "order": 3,
                "children": []
              }]
            }
          ]
        },
        {"id": "13",
          "type": 0,
          "order": 2,
          "children": [
            {
              "id": "10",
              "type": 0,
              "order": 1,
              "children": [
                {
                  "id": "4",
                  "type": 1,
                  "order": 1,
                  "children": []
                }, {
                  "id": "5",
                  "type": 1,
                  "order": 2,
                  "children": []
                }, {
                  "id": "6",
                  "type": 1,
                  "order": 3,
                  "children": []
                }]
            },
            {
              "id": "11",
              "type": 0,
              "order": 2,
              "children": [
                {
                  "id": "7",
                  "type": 1,
                  "order": 1,
                  "children": []
                }]
            }]
        }
      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('删除子思路的唯一重要步骤，其父亲没有兄弟节点，则插到该思路下', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "10",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "8",
              "type": 0,
              "order": 1,
              "children": [{
                "id": "1",
                "type": 1,
                "order": 1,
                "children": []
              },{
                "id": "2",
                "type": 1,
                "order": 2,
                "children": []
              },{
                "id": "3",
                "type": 1,
                "order": 3,
                "children": []
              }]
            },
            {
              "id": "9",
              "type": 0,
              "order": 2,
              "children": [{
                "id": "4",
                "type": 1,
                "order": 1,
                "children": []
              }]
            }
          ]
        }
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 14;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "10",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "8",
              "type": 0,
              "order": 1,
              "children": [{
                "id": "1",
                "type": 1,
                "order": 1,
                "children": []
              }, {
                "id": "2",
                "type": 1,
                "order": 2,
                "children": []
              }, {
                "id": "3",
                "type": 1,
                "order": 3,
                "children": []
              }]
            }
          ]
        },
        {
          "id": "4",
          "type": 1,
          "order": 2,
          "children": []
        }
      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('case 4', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "6",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "1",
              "type": 1,
              "order": 1,
              "children": []
            },
            {
              "id": "2",
              "type": 1,
              "order": 2,
              "children": []
            }]
        },
        {
          "id": "7",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "8",
              "type": 0,
              "order": 1,
              "children": [
                {
                  "id": "3",
                  "type": 1,
                  "order": 1,
                  "children": []
                },
                {
                  "id": "4",
                  "type": 1,
                  "order": 2,
                  "children": []
                },
                {
                  "id": "5",
                  "type": 1,
                  "order": 3,
                  "children": []
                }]
            },
          ]
        },
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 9;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "7",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "9",
              "type": 0,
              "order": 1,
              "children": [
                {
                  "id": "1",
                  "type": 1,
                  "order": 1,
                  "children": []
                }, {
                  "id": "2",
                  "type": 1,
                  "order": 2,
                  "children": []
                }, {
                  "id": "3",
                  "type": 1,
                  "order": 3,
                  "children": []
                }, {
                  "id": "4",
                  "type": 1,
                  "order": 4,
                  "children": []
                }
              ]
            },
            {
              "id": "10",
              "type": 0,
              "order": 2,
              "children": [{
                "id": "5",
                "type": 1,
                "order": 1,
                "children": []
              }]
            }
          ]
        }
      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });

  it('case 4 ertra', () => {
    const question_tree_structure = {
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "7",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "8",
              "type": 0,
              "order": 1,
              "children": [
                {
                  "id": "1",
                  "type": 1,
                  "order": 1,
                  "children": []
                }, {
                  "id": "2",
                  "type": 1,
                  "order": 2,
                  "children": []
                }, {
                  "id": "3",
                  "type": 1,
                  "order": 3,
                  "children": []
                }, {
                  "id": "4",
                  "type": 1,
                  "order": 4,
                  "children": []
                },
                {
                  "id": "5",
                  "type": 1,
                  "order": 5,
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    };
    const step_teach_info = {
      "1": {
        "text": "由题知: $AD\\parallel EC$, 且$EC=\\frac12BC=2=AD$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "2": {
        "text": "$\\therefore$四边形$ADEC$是平行四边形\n$\\therefore AE=DC=AB=BE=2$\n$\\therefore \\triangle ABE$是等边三角形\n$\\therefore MB_1\\perp AE$, $DM\\perp AE$ \n以$ME$为$x$轴, $MD$为$y$轴, $MB_{1}$为$z$轴建立空间直角坐标系\n$C(2, 2, 0)$, $B_{1}(0, 0, \\sqrt3)$, $A(-1, 0, 0)$, $D(0, \\sqrt3, 0) $\n$\\vec{DA}=(-1,-\\sqrt3,0)$, $\\vec{BA}=(-1,0,-\\sqrt3)$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "3": {
        "text": "平面$AB_{1}E$的法向量为$\\vec{n}=(0, 1, 0)$\n设平面$DB_{1}A$的法向量为$\\vec m=(x, y, z)$\n得: $\\begin{cases} \\vec{m} \\cdot \\vec{DA} =0 \\\\ \\vec{m} \\cdot \\vec{B_1A} = 0 \\end{cases}$",
        "topic": null,
        "is_important": false,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "4": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      },
      "5": {
        "text": "解得: $\\begin{cases} y=z\\\\x=-\\sqrt3y\\end{cases}$, 取$y=1$, 得: $\\vec{m}=(-\\sqrt3, 1, 1)$\n$\\therefore\\cos\\lt\\vec{n},\\vec{m}\\gt =\\frac{\\vec{n}\\cdot\\vec{m}}{|\\vec{n}|\\cdot|\\vec{m}|}= \\frac{\\sqrt{5}}5$",
        "topic": null,
        "is_important": true,
        "is_hidden": false,
        "image_list": [],
        "important_text_locations": []
      }
    };
    const max_id = 9;
    const expected = JSON.stringify({
      "id": "0",
      "type": 0,
      "order": 1,
      "children": [
        {
          "id": "7",
          "type": 0,
          "order": 1,
          "children": [
            {
              "id": "9",
              "type": 0,
              "order": 1,
              "children": [
                {
                  "id": "1",
                  "type": 1,
                  "order": 1,
                  "children": []
                }, {
                  "id": "2",
                  "type": 1,
                  "order": 2,
                  "children": []
                }, {
                  "id": "3",
                  "type": 1,
                  "order": 3,
                  "children": []
                }, {
                  "id": "4",
                  "type": 1,
                  "order": 4,
                  "children": []
                }
              ]
            },
            {
              "id": "10",
              "type": 0,
              "order": 2,
              "children": [
                {
                  "id": "5",
                  "type": 1,
                  "order": 1,
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    });

    expect(JSON.stringify(main.main(question_tree_structure, step_teach_info, max_id))).toBe(expected);
  });
});
