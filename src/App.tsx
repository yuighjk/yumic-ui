import Logo from "@/assets/logo.png";
import { Button, Icon, Menu, Input, AutoComplete } from "@/components";


export default function App() {
  return (
    <main className="semi-always-light">
      <h3>AutoComplete组件</h3>
      <AutoComplete placeholder="测试autocomplete"
        options={['1', '2', '3', '4', '5']}
        filterOptions={(input, options) => options > input}
        autoFocus
      ></AutoComplete>
      <AutoComplete placeholder="测试autocomplete"
        options={['1', '2', '3', '4', '5']}
        filterOptions={(input, options) => options > input}
        render={item => <h3>{item}</h3>}
      ></AutoComplete>
      <AutoComplete placeholder="测试autocomplete"
        options={[
          { label: 'aa', value: '123', id: '123' },
          { label: 'aba', value: '23', id: '1a' },
          { label: 'afa', value: '13', id: '1d' },
          { label: 'asa', value: '243', id: '1f' }
        ]}>

      </AutoComplete>
      <AutoComplete placeholder="测试autocomplete" disabled></AutoComplete>
      <h3>Input组件</h3>
      <Input placeholder="test input" allowClear></Input>
      <Input placeholder="disabled" disabled></Input>

      <h3>Input size组件</h3>
      <Input placeholder="小 input" size="small"></Input>
      <Input placeholder=" input" size="default"></Input>
      <Input placeholder="大 input" size="large"></Input>
      <h3>Input addon组件</h3>
      <Input addonBefore='http://' addonAfter='com' placeholder="请输入网站域名"></Input>

      <Input addonBefore='http://' placeholder="test input"></Input>
      <Input addonAfter='com' placeholder="test input"></Input>
      <h3>Input suffix,prefix组件</h3>
      <Input suffix={
        <Icon type="bs" icon="BsFillArrowDownLeftSquareFill" color="red"></Icon>
      }
        placeholder="suffix"></Input>
      <Input prefix={
        <Icon type="bs" icon="BsFillArrowDownLeftSquareFill" color="red"></Icon>
      } placeholder="prefix"></Input>
      <Input prefix={
        <Icon type="bs" icon="BsFillArrowDownLeftSquareFill" color="red"></Icon>
      }
        suffix={
          <Icon type="bs" icon="BsFillArrowDownLeftSquareFill" color="red"></Icon>
        }
        placeholder="prefix"></Input>
      <h3>SubMenu组件</h3>
      <Menu
        className={"test"}
        mode="vertical"
        defaultIndex="2-0"
        defaultOpenKeys={["2"]}
        onSelect={val => {
          console.log(val);
        }}
      >
        <Menu.Item>首页</Menu.Item>
        <Menu.Item disabled>禁止菜单</Menu.Item>
        <Menu.SubMenu title="子菜单标题">
          <Menu.Item>选项1</Menu.Item>
          <Menu.Item>选项2</Menu.Item>
          <Menu.Item>选项3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>关于页面</Menu.Item>
        <Menu.Item>菜单子项</Menu.Item>
      </Menu>
      <h3>Menu组件</h3>
      <Menu
        className={"test"}

        onSelect={val => {
          console.log(val);
        }}
      >
        <Menu.Item>1</Menu.Item>
        <Menu.Item disabled>
          2
        </Menu.Item>
        <Menu.Item>3</Menu.Item>
        <Menu.Item>4</Menu.Item>
      </Menu>
      <h3>Icon组件</h3>
      <Icon type="bs" icon="BsFillArrowDownLeftSquareFill" color="red"></Icon>
      <Icon
        custom
        url="//at.alicdn.com/t/font_1791095_6urvhbxaj73.css"
        icon="qian"
        size="44px"
        style={{ color: "red" }}
      ></Icon>
      <h3>Button组件</h3>
      <Button
        id="app1"
        disabled
        onClick={() => {
          console.log("button click");
        }}
      >
        普通的Button
      </Button>
      <Button size="small" type="default">Small Btn</Button>
      <Button size="large" type="default">Large Btn</Button>
      <Button type="danger">danger Btn</Button>
      <Button type="primary" loading>
        primary Btn
      </Button>
      <Button type="default">default Btn</Button>
      <Button type="default" loading>
        default loading Btn
      </Button>
      <Button href="http://www.imooc.com" target="_blank" type="link">
        链接的Button
      </Button>
      <Button href="http://www.imooc.com" target="_blank" type="link" disabled>
        disabled 链接的Button
      </Button>

    </main>
  );
}
