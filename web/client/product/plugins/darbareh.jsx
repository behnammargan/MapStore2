/*
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux';
import Message from '../../components/I18N/Message';
import {toggleControl} from '../../actions/controls';
import {addLayer} from '../../actions/layers';
// const {addLayer} = require('../../actions/layers');
// const {toggleMapInfoState} = require('../../actions/mapInfo')
import {setStyleParameter} from '../../actions/style';
import {changeDrawingStatus} from '../../actions/draw';
import {layerLoading} from '../../actions/layers';
import {layerLoad} from '../../actions/layers';
import darbareh from '../components/viewer/about/darbareh';

const Darbareh = connect((state) => ({
    enabled: state.controls && state.controls.darbareh && state.controls.darbareh.enabled || false,
    withButton: false,
    latlng: state?.example?.version,
    extent: state?.example?.extent
}), {
    onClose: toggleControl.bind(null, 'darbareh', null),
    addLayers:addLayer,
    setStyleParameter:setStyleParameter,
    changeDrawingStatus:changeDrawingStatus,
    layerLoading:layerLoading,
    layerLoad:layerLoad
})(darbareh);

const assign = require('object-assign');
const {Glyphicon} = require('react-bootstrap');

/**
 * Plugin for the "About" window in mapstore.
 * @name Darbareh
 * @class
 * @memberof plugins
 */
export default {
    DarbarehPlugin: assign(Darbareh,
        {
            BurgerMenu: {
                name: 'test',
                position: 1600,
                text: <Message msgId="darbareh"/>,
                icon: <Glyphicon glyph="info-sign"/>,
                action: toggleControl.bind(null, 'darbareh', null),
                priority: 1,
                doNotHide: true
            }
        }),
    reducers: {}
};
