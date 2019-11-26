# adapt-lottie  

**adapt-lottie** is a component that allows the bodymovin After Effects plugin to be used in Adapt learning courses.  

## Installation

It may be installed with the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:

    adapt install adapt-lottie

Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:
    
    "adapt-lottie": "*"  

Then running the command:

    adapt install  

(This second method will reinstall all plug-ins listed in *adapt.json*.)  

If **adapt-lottie** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  

<div float align=right><a href="#top">Back to Top</a></div>

## Settings Overview

The attributes listed below are used in *components.json* to configure **Text**, and are properly formatted as JSON in [*example.json*](https://github.com/dancgray/adapt-lottie/blob/master/example.json).

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**_component** (string): This value must be: `lottie`.

**_classes** (string): CSS class name to be applied to **adapt-lottie**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.  

**title** (string): A reference title for the component. **title** is distinct from the **displayTitle** which, if present, appears above the component. **title** provides the opportunity to use a shortened form in tighter spaces, such as in menus or in the drawer.  

**displayTitle** (string): Optional text that will display as a title or header above the component. It can be used as a headline.   

**instruction** (string): This optional text appears above the component. It is frequently used to
guide the learner’s interaction with the component.

**body** (string): Although optional, this text constitutes what is thought of as the primary *text* of the **Text** component. HTML is permitted.  

**\_fallback** (object): An image to be displayed while the animation is loading or if the animation fails to load. It contains values for **src** and **alt**.

> **alt** (string): This text becomes the fallback image’s alt attribute.

> **src** (string): File name (including path) of the image used for a fallback. Path should be relative to the src folder (e.g., course/en/images/origami-menu-two.jpg).

**\_animation** (object): The animation to be displayed. It contains values for **src**, **alt** &amp; **description*.

> **alt** (string): The alternative text for this animation. This text should serve as a title for the animation.

> **description** (string): Optional fully accessible description of the animation. 

> **src** (string): File name (including path) of the JSON file produced by the bodymovin plugin. Path should be relative to the src folder (e.g., course/en/images/my-awesome-animation.json).
    
**attribution** (string): Optional text to be displayed as an attribution. By default it is displayed below the image. Adjust positioning by modifying CSS. Text can contain HTML tags, e.g., Copyright © 2015 by <b>Lukasz 'Severiaan' Grela</b>.

**\_autoplay** (boolean): Whether the animation should begin playback when loaded.

**\_loop** (boolean): Whether the animation playback should be looped.

**\_showPauseControl** (boolean): If true, displays a small Play/Pause button at the bottom right of the animation.

<div float align=right><a href="#top">Back to Top</a></div>

## Accessibility

- Remember to include an **alt** attribute for both the fallback image and the animation itself.
- The animation's **alt** attribute is intended to be a short title. If the animation is used for instructional purposes, 
 the course content should describe the animation in adjacent text. 
- If the course content cannot describe the animation, the **description** attribute should be supplied with a complete
description of the animation. 

<div float align=right><a href="#top">Back to Top</a></div>

## Limitations

- The Adapt Lottie component can only use the bodymovin SVG renderer. 
- The animation must be created as **vector-only** animation. 
- The animation should avoid pixel effects (such as the non-SVG versions of blur, shadow, etc.) that would generate 
 additional images.

<div float align=right><a href="#top">Back to Top</a></div>

----------------------------
**Version number:**  0.9.10  
**Framework versions:** 2.4+  
**Author / maintainer:** [Dan Gray](https://github.com/dancgray)   
**Accessibility support:** Working / To be confirmed   
**RTL support:** To be confirmed  
**Cross-platform coverage:** To be confirmed
