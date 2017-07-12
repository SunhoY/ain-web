import React from 'react';
import {shallow} from 'enzyme';
import SurveyView from "../../../src/component/survey/survey-view";
import {expect} from 'chai';
import sinon from 'sinon';

describe('Survey View Spec', () => {
    it('has imageURL property as source image', () => {
        const wrapper = shallow(<SurveyView imageURL="http://image.jpg"/>);

        let faceImage = wrapper.find("img");

        expect(faceImage.prop("src")).to.equal("http://image.jpg");
    });

    it('runs handler received as property on like click', () => {
        const onLikeClickSpy = sinon.spy();
        const wrapper = shallow(<SurveyView onLikeClick={onLikeClickSpy}/>);

        wrapper.find("button.btn-primary").simulate('click');

        expect(onLikeClickSpy.called).to.be.true;
    });

    it('runs handler received as property on like click', () => {
        const onDislikeClick = sinon.spy();
        const wrapper = shallow(<SurveyView onDislikeClick={onDislikeClick}/>);

        wrapper.find("button.btn-default").simulate('click');

        expect(onDislikeClick.called).to.be.true;
    });
});
