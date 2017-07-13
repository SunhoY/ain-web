import React from 'react';
import {shallow} from 'enzyme';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import {expect} from 'chai';
import Survey, {S3_URL, AIN_IMAGES_BUCKET} from "../../../src/component/survey/survey";
import {examineAPIHeadersAndCORS} from "../../examineAPIHeadersAndCORS";

const FACE_BASE_API_URL = "https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/facebase";
const PREFERENCE_API_URL = "https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/preference";

describe('Survey Spec', () => {
    let wrapper;

    const faceBase1 = {
        fileName: "image1.jpg",
        faceData: {
            leftEye: "leftEye1"
        }
    }, faceBase2 = {
        fileName: "image2.jpg",
        faceData: {
            leftEye: "leftEye2"
        }
    }, faceBase3 = {
        fileName: "image3.jpg",
        faceData: {
            leftEye: "leftEye3"
        }
    };

    beforeEach((done) => {
        fetchMock.mock({
            method: "GET",
            matcher: `${FACE_BASE_API_URL}?gender=Female`,
            response: [faceBase1, faceBase2, faceBase3]
        });

        wrapper = shallow(<Survey gender="Female"/>, {
            options: {
                disableLifecycleMethods: true
            }
        });

        wrapper.instance().componentWillMount().then(() => {
            done();
        });
    });

    it('fetches facebase rest api depends on gender property', () => {
        expect(fetchMock.called(`${FACE_BASE_API_URL}?gender=Female`)).to.be.true;
    });

    it('changes faceBases state', () => {
        expect(wrapper.state("faceBases")).to.eql([
            Object.assign({}, faceBase1, {fileURL: `${S3_URL}/${AIN_IMAGES_BUCKET}/image1.jpg`}),
            Object.assign({}, faceBase2, {fileURL: `${S3_URL}/${AIN_IMAGES_BUCKET}/image2.jpg`}),
            Object.assign({}, faceBase3, {fileURL: `${S3_URL}/${AIN_IMAGES_BUCKET}/image3.jpg`}),
        ]);
    });

    it('sets first face image as showingFaceBase state', () => {
        expect(wrapper.state('showingFaceBase')).to.eql(
            Object.assign({}, faceBase1, {fileURL: `${S3_URL}/${AIN_IMAGES_BUCKET}/image1.jpg`})
        );
    });

    describe('Showing Next Image', () => {
        beforeEach(() => {
            wrapper.instance().showNextImage();
        });

        it('sets showingFaceBase state with next index', () => {
            expect(wrapper.state("showingFaceBase")).to.eql(
                Object.assign({}, faceBase2, {fileURL: `${S3_URL}/${AIN_IMAGES_BUCKET}/image2.jpg`})
            );
        });

        it('changes showingIndex state', () => {
            expect(wrapper.state("showingIndex")).to.equal(1);
        });

        it('does not change states when surveyDone state is true', () => {
            wrapper.setState({
                showingIndex: 3,
                surveyDone: true,
                showingFaceBase: Object.assign({}, faceBase2, {fileURL: "someURL"})
            });

            wrapper.instance().showNextImage();

            expect(wrapper.state("showingIndex")).to.equal(3);
        });
    });

    describe('Store Preference', () => {
        it('adds preference with file name and boolean true', () => {
            wrapper.instance().storePreference(true);

            const preferences = wrapper.state("preferences");
            const faceBases = wrapper.state("faceBases");

            expect(preferences.length).to.equal(1);
            expect(preferences[0]).to.eql(Object.assign({}, {faceData: {leftEye: "leftEye1"}}, {preference: true}));
        });

        it('changes surveyDone state when all faces are surveyed and does not increase preferences', () => {
            wrapper.instance().storePreference(true);
            wrapper.instance().storePreference(true);
            wrapper.instance().storePreference(true);

            const preferences = wrapper.state("preferences");
            const surveyDone = wrapper.state("surveyDone");

            expect(preferences.length).to.equal(3);
            expect(surveyDone).to.be.true;

            wrapper.instance().storePreference(true);

            expect(preferences.length).to.equal(3);
        });
    });

    let showsNextImage = () => {
        it('shows next image', () => {
            let instance = wrapper.instance();

            sinon.spy(instance, "showNextImage");

            wrapper.instance().onLikeClick();

            expect(instance.showNextImage.called).to.be.true;

            wrapper.instance().onDislikeClick();

            expect(instance.showNextImage.called).to.be.true;
        });
    };

    describe('Like Click', () => {
        showsNextImage();

        it('adds preference with file name and boolean false', () => {
            wrapper.instance().onLikeClick();

            const preferences = wrapper.state("preferences");
            const faceBases = wrapper.state("faceBases");

            expect(preferences.length).to.equal(1);
            expect(preferences[0]).to.eql(Object.assign({}, {faceData: faceBases[0].faceData}, {preference: true}));
        });

    });

    describe('Dislike Click', () => {
        showsNextImage();

        it('adds preference with file name and boolean false', () => {
            wrapper.instance().onDislikeClick();

            const preferences = wrapper.state("preferences");
            const faceBases = wrapper.state("faceBases");

            expect(preferences.length).to.equal(1);
            expect(preferences[0]).to.eql(Object.assign({}, {faceData: faceBases[0].faceData}, {preference: false}));
        });
    });

    describe('Submitting Preferences', () => {
        let options;

        beforeEach(() => {
            wrapper.setState({preferences: ["first", "second"]});

            fetchMock.mock({
                matcher: PREFERENCE_API_URL,
                response: {
                    status: 200
                },
                method: "GET"
            });

            wrapper.instance().submitPreferences();

            options = fetchMock.lastOptions(PREFERENCE_API_URL);
        });

        it('fetches with post preferences api', () => {
            expect(fetchMock.called(PREFERENCE_API_URL)).to.be.true;
        });

        it('has api apiHeaders and cors mode', () => {
            const {headers, mode} = options;

            examineAPIHeadersAndCORS(headers, mode);
        });

        it('posts with preferences state as a body', () => {
            const {body} = options;

            expect(body).to.eql(JSON.stringify({preferences: ["first", "second"]}));
        });
    });
});