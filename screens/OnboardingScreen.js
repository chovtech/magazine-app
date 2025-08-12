import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const onboardingSlides = [
  {
    id: '1',
    title: 'Contemporary World Nigeria Magazine App',
    description:
      'Stay informed with insightful articles, breaking news, and deep analyses from around the globe — all in one place.',
    image: require('../assets/img/slide6.jpg'),
  },
  {
    id: '2',
    title: 'Shaping China-Nigeria Economic Relationship',
    description:
      'Exploring trade, investment, and strategic cooperation shaping China-Nigeria’s economic partnership today',
    image: require('../assets/img/slide2.jpg'),
  },
  {
    id: '3',
    title: 'Get the latest update on issues around the world',
    description:
      'From politics to culture, access timely updates and expert perspectives on the stories that matter most.',
    image: require('../assets/img/slide5.jpg'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const dragX = useRef(new Animated.Value(0)).current;
  const panGestureRef = useRef();

  const goToNextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      const newIndex = currentSlide + 1;
      setCurrentSlide(newIndex);
      Animated.spring(translateX, {
        toValue: -width * newIndex,
        useNativeDriver: true,
        tension: 30,
        friction: 8,
      }).start();
    } else {
      navigation.replace('MainTabs');
    }
  };

  const skipOnboarding = () => {
    navigation.replace('MainTabs');
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: dragX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;
      let newIndex = currentSlide;

      if (translationX < -50 && currentSlide < onboardingSlides.length - 1) {
        newIndex = currentSlide + 1;
      } else if (translationX > 50 && currentSlide > 0) {
        newIndex = currentSlide - 1;
      }

      dragX.setValue(0); // Reset drag
      setCurrentSlide(newIndex);

      Animated.spring(translateX, {
        toValue: -width * newIndex,
        useNativeDriver: true,
        tension: 30,
        friction: 8,
      }).start();
    }
  };

  const slideTranslate = Animated.add(translateX, dragX);

  return (
    <View style={styles.container}>
      <PanGestureHandler
        ref={panGestureRef}
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-10, 10]}
      >
        <Animated.View
          style={[
            styles.slidesContainer,
            {
              width: width * onboardingSlides.length,
              transform: [{ translateX: slideTranslate }],
            },
          ]}
        >
          {onboardingSlides.map((slide, index) => (
            <View key={slide.id} style={{ width, height, overflow: 'hidden' }}>
              <ImageBackground
                source={slide.image}
                style={styles.backgroundImage}
                resizeMode="cover"
              >
                <View style={styles.gradientOverlay}>
                  <View style={styles.contentArea}>
                    <View style={styles.indicatorContainer}>
                      {onboardingSlides.map((_, i) => (
                        <View
                          key={i}
                          style={[
                            styles.indicator,
                            currentSlide === i && styles.activeIndicator,
                          ]}
                        />
                      ))}
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{slide.title}</Text>
                      <Text style={styles.description}>
                        {slide.description}
                      </Text>
                    </View>

                    <View style={styles.buttonWrapper}>
                      <TouchableOpacity
                        style={styles.fullWidthButton}
                        onPress={goToNextSlide}
                      >
                        <Text style={styles.buttonText}>
                          {currentSlide === onboardingSlides.length - 1
                            ? 'Get Started'
                            : 'Next'}
                        </Text>
                      </TouchableOpacity>

                      {currentSlide !== onboardingSlides.length - 1 && (
                        <TouchableOpacity
                          style={styles.skipButton}
                          onPress={skipOnboarding}
                        >
                          <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0316',
    overflow: 'hidden',
  },
  slidesContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0E0316', // match dark background
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0E0316', // match dark background
  },
  gradientOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 3,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#4CAF50',
    width: 30,
  },
  textContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
    fullWidthButton: {
    backgroundColor: 'transparent', // or remove this line
    paddingVertical: 12,
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderColor: '#4CAF50', // the border color
    borderWidth: 2,         // thickness of the border
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 1,
   
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textDecorationLine: 'none',
  },
});

export default OnboardingScreen;