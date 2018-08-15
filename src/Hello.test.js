import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
function Hello(props) {
    return (<h2>Hello at {props.now}</h2>)
}

const moment = new Date(2018, 11, 24, 10, 33, 30, 0);

describe('When testing directly', () => {
    let result;

    beforeAll(() => {
        result = Hello({now: moment.toISOString()});
    })
    it('returns a value', () => {
        expect(result).not.toBeNull();
    });    

    it('is a h1', ()=> {
       expect(result.type).toBe("h2");
    })

    it('it has children', () => {
        expect(result.props.children).toBeTruthy();
    })
})

describe('When testing with ReactDOM', () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(<Hello now={moment.toISOString()} />, div);
    })
})
Enzyme.configure({adapter: new Adapter()});
describe('When testing with enzyme', () => {
    it('renders a h2', () => {
        const wrapper = shallow(<Hello now={moment.toISOString()} />)
        expect(wrapper.find('h2').length).toBe(1);
    })

    it('contains hello at 2018, 11, 24, 10, 33, 30, 0', () => {
        const wrapper = shallow(<Hello now={moment.toISOString()} />)
        expect(wrapper.contains(<h2>Hello at 2018-12-24T10:33:30.000Z</h2>)).toBe(true);

    });
})