import * as React from 'react';
import * as Ad from 'antd';
import { getModuleTree, Module } from '@/services/permission';
import styles from './style.less';

export interface Props {
  onSelectModule: (moduleKey: string) => void,
  forceUpdate?: JSONObject,
}

const findDefaultModule = (moduleChild: Module | Module[]): Optional<Module> => {
  if (Array.isArray(moduleChild)) {
    let targetModule: Optional<Module>;
    moduleChild.forEach(child => {
      if (targetModule) {
        return;
      }
      const childModule = findDefaultModule(child);
      if (childModule) {
        targetModule = childModule;
      }
    });
    return targetModule;
  }
  if (moduleChild.isModule) {
    return moduleChild;
  }
  if (moduleChild.children?.length) {
    return findDefaultModule(moduleChild.children);
  }
  return undefined;
}

/**
 * 在子节点中维护父节点的key
 */
const withParentRef = (moduleChild: Module | Module[], parent?: string): void => {
  if (Array.isArray(moduleChild)) {
    moduleChild.forEach(child => {
      withParentRef(child, parent);
    });
    return;
  }
  // eslint-disable-next-line no-param-reassign
  parent && (moduleChild.$parent = parent);
  if (moduleChild.children?.length) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    withParentRef(moduleChild.children, moduleChild.key);
  }
}

const ModuleTree: React.FC<Props> = ({ onSelectModule, forceUpdate }) => {
  const [modules, setModules] = React.useState<Module[]>([]);
  const [expandedKey, setExpandedKey] = React.useState<string>('');
  const [selectedKey, setSelectedKey] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      const { data: resModules } = await getModuleTree();
      withParentRef(resModules);
      setModules(resModules);
      // 默认选中第一个模块
      const defaultModule = findDefaultModule(resModules);
      handleSelect(defaultModule);
      setExpandedKey(defaultModule?.key || '');
    })();
  }, [forceUpdate]);

  function handleSelect(node: any) {
    const module = node as Module;
    if (!module.isModule) {
      return;
    }
    setSelectedKey(module.key);
    onSelectModule(module.key);
  }

  function handleExpand(_1: any, { node, expanded }: { expanded: boolean, node: any }) {
    handleSelect(node);
    if (expanded) {
      setExpandedKey(node?.key);
      return;
    }
    setExpandedKey(node?.$parent || '');
  }

  return (
    <div>
      {
        modules.length > 0 ? <Ad.Tree
          expandedKeys={[expandedKey]}
          selectedKeys={[selectedKey]}
          treeData={modules}
          autoExpandParent
          blockNode
          onExpand={handleExpand}
          onSelect={(_1, { node }) => handleSelect(node)}
          titleRender={(nodeData: any) => {
            if (nodeData.isRoot) {
              return (<span className={styles.firstNode}>{nodeData.title}</span>)
            }
            return (
              <span>
                {nodeData.title}
              </span>
            )
          }}
        /> : <></>
      }
    </div>

  )
}

export default ModuleTree
