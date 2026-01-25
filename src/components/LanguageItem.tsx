import { colors } from "@/constants/colors";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native";

type LanguageItemProps = {
    label: string;
    language: string;
    onPress: (code: string) => void;
};

export const LanguageItem = ({ label, language, onPress }: LanguageItemProps) => {
    return (
        <Pressable
            style={styles.languageSelector}
            onPress={() => onPress(language)}
        >
            <Text
                style={{
                    fontFamily: 'outfit-medium',
                    color: colors.textPrimary,
                    fontSize: 14,
                }}
            >
                {label}
            </Text>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    languageContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        gap: 10,
    },
    languageSelector: {
        backgroundColor: "grey",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    }
})