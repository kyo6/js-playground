/**
 * 将当前的抽象语法树，以我们定义的规则生成新的抽象语法树
 * @param {*} ast 
 * @returns {*} newAst
 */

const transformer = (ast) => {
  // 新 ast
  const newAst = {
    type: "Program",
    body: [],
  };

  // 在老 ast 上加一个指针指向新 ast
  ast._context = newAst.body;

  traverser(ast, {
    // 对于变量声明的处理方法
    VariableDeclaration: (node, parent) => {
      let functionDeclaration = {
        params: [],
      };
      if (node.init.type === "ArrowFunctionExpression") {
        functionDeclaration.type = "FunctionDeclaration";
        functionDeclaration.identifierName = node.identifierName;
      }

      if (node.init.body.type === "BinaryExpression") {
        functionDeclaration.body = {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: node.init.body,
            },
          ],
        };
      }

      parent._context.push(functionDeclaration);
    },

    //对于字符的处理方法
    identifier: (node, parent) => {
      if (parent.type === "ArrowFunctionExpression") {
        // 忽略我这暴力的操作....领略大意即可..
        ast._context[0].params.push({
          type: "identifier",
          identifierName: node.identifierName,
        });
      }
    },
  });

  return newAst;
};


const traverser = (ast, visitor) => {
  // 如果节点是数组那么遍历数组
  const traverseArray = (array, parent) => {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  };

  // 遍历 ast 节点
  const traverseNode = (node, parent) => {
    const method = visitor[node.type];

    if (method) {
      method(node, parent);
    }

    switch (node.type) {
      case "Program":
        traverseArray(node.body, node);
        break;

      case "VariableDeclaration":
        traverseArray(node.init.params, node.init);
        break;

      case "identifier":
        break;

      default:
        throw new TypeError(node.type);
    }
  };
  traverseNode(ast, null);
};
