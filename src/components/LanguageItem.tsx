import { colors } from "@/constants/colors";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native";

type LanguageItemProps = {
    label: string;
    language: string;
    selected?: boolean;
    onPress: (code: string) => void;
};

export const LanguageItem = ({ label, language, selected = false, onPress }: LanguageItemProps) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.languageSelector,
                selected && styles.selected,
                !selected && styles.unselected,
                pressed && { transform: [{ scale: 0.97 }] },
            ]}

            onPress={() => onPress(language)}
        >
            <Text
                style={[styles.label, selected && styles.selectedLabel]}
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
    },
    unselected: {
        opacity: 0.5,
    },
    selected: {
        opacity: 1,
        backgroundColor: "#555",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    selectedLabel: {
        fontFamily: "outfit-medium",
    },
    label: {
        fontFamily: "outfit",
        fontSize: 14,
        color: colors.textPrimary,
    },


})