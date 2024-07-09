import { Text, type TextProps, StyleSheet, View } from 'react-native';

export type LocationNotFoundProps = TextProps & {
  lightColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export default function LocationNotFound({
  style,
  lightColor,
  type = 'default',
  ...rest
}: LocationNotFoundProps) {
  const color = lightColor

  return (
    <View style={styles.locationNotFoundContainer}>
        <Text
        style={[
            { color },
            type === 'default' ? styles.default : undefined,
            type === 'title' ? styles.title : undefined,
            type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
            type === 'subtitle' ? styles.subtitle : undefined,
            type === 'link' ? styles.link : undefined,
            style,
        ]}
        {...rest}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    locationNotFoundContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height: "70%",
    },
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
});
