import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  Transfer,
  TreeSelect,
} from 'antd';
import React, { FunctionComponent, memo } from 'react';

interface Layout {
  xl?: number;
  lg?: number;
  md?: number;
  xs?: number;
  span?: number;
}
interface InternalProps {
  items: FormItem[];
}

interface FormItem {
  type?: string;
  layout?: Layout;
  formItemProps?: any;
  componentProps?: any;
  render?: (item: FormItem) => React.ReactNode;
  renderSpan?: number;
}

const defaultLayout = {
  lg: 8,
  md: 12,
  xs: 24,
};

const FormItems: FunctionComponent<InternalProps> = memo(({ items }) => {
  const getItemByType = (item: FormItem): React.ReactNode => {
    const { type, componentProps = {} } = item;
    const { options = [], placeholder, ...otherProps } = componentProps;

    const collection = {
      Input: <Input {...otherProps} placeholder={placeholder || '请输入'} />,

      Select: (
        <Select {...otherProps} placeholder={placeholder || '请选择'}>
          {Array.isArray(options) &&
            options.map((v) => (
              <Select.Option key={v.value} value={v.value} disabled={!v.enabled}>
                {v.label}
              </Select.Option>
            ))}
        </Select>
      ),

      TextArea: <Input.TextArea {...otherProps} />,

      Radio: (
        <Radio.Group {...otherProps}>
          {Array.isArray(options) &&
            options.map((v) => (
              <Radio key={v.value} value={v.value}>
                {v.label}
              </Radio>
            ))}
        </Radio.Group>
      ),

      InputNumber: <InputNumber {...otherProps} placeholder={placeholder || '请输入'} />,

      InputPassword: <Input.Password {...otherProps} />,

      CheckboxGroup: <Checkbox.Group {...otherProps} />,

      Transfer: <Transfer {...otherProps} />,

      TreeSelect: <TreeSelect {...otherProps} />,

      Switch: <Switch {...otherProps} />,
    };

    return collection[type as string] ? collection[type as string] : null;
  };

  return (
    <Row gutter={24}>
      {items.map((item: FormItem) => {
        const { type, formItemProps = {}, render, layout = defaultLayout, renderSpan = 24 } = item;
        const { label, name, required, rules = [], ...others } = formItemProps;

        const defaultRules = [
          { required: true, message: `${type === 'Select' ? '请选择' : '请输入'}${label}!` },
        ];

        const rulesProps = required ? [...defaultRules, ...rules] : rules;
        const layoutProps = !type ? { span: renderSpan } : layout;

        return (
          <Col key={name} {...layoutProps}>
            {type ? (
              <Form.Item name={name} label={label} rules={rulesProps} {...others}>
                {getItemByType(item)}
              </Form.Item>
            ) : (
              (render && render(item)) || null
            )}
          </Col>
        );
      })}
    </Row>
  );
});

export default FormItems;
